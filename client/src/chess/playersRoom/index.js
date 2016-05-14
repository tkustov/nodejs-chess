var angular = require('angular');
var ngRoute = require('angular-route');
var PlayersRoomComponent = require('./playersRoom.component');
var PlayersRoomFactory = require('./playersRoom.factory');
var SocketFactory = require('../socket/socket.factory');

module.exports = 'chess.playersRoom';

angular.module('chess.playersRoom', [
  ngRoute
  ]).
run(SocketInit).
config(RouteConfig).
factory('PlayersRoom', PlayersRoomFactory).
factory('Socket', SocketFactory).
component('playersroom', PlayersRoomComponent);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.when('/players-room', {
    template: '<playersroom></playersroom>'
  });
}

SocketInit.$inject = ['$rootScope', '$location', 'Socket', 'user', 'PlayersRoom', 'Game'];
function SocketInit($rootScope, $location, Socket, user, PlayersRoom, Game) {

  var gameSocket;

  $rootScope.$on('Authorized', function(){
    gameSocket = Socket('game');

    gameSocket.on('connect', function() {
      gameSocket.emit('identification', { userId: user.userInfo._id });
      user.setOnline();
      PlayersRoom.fetchUsersOnline();
      console.log('connected to "game" namespace');
    });

    gameSocket.on('disconnect', function() {
      user.setOffline();
      PlayersRoom.clearUsersOnline();
      PlayersRoom.clearInvitations();
      console.log('Connection lost... :(');
    });

    gameSocket.on('userJoined', function(data){
      PlayersRoom.newUser(data);
    });

    gameSocket.on('userLeft', function(data){
      PlayersRoom.removeUser(data.userId);
      PlayersRoom.removeInvitationFromUser(data.userId);
    });

    gameSocket.on('incomingInv', function(data){
      PlayersRoom.putInvitation(data);
    });

    gameSocket.on('cancelInv', function(data){
      console.log('cancelInv');
      PlayersRoom.removeInvitationFromUser(data.userId);
    });

    gameSocket.on('refuseInv', function(data){
      console.log('refuseInv');
      PlayersRoom.changeUserStatus(data.userId, 'free');
    });

    gameSocket.on('startGame', function(data){
      PlayersRoom.getUsersOnline().forEach(function(u){
        if (u.id === data.blackPlayer) {
          data.blackPlayerName = u.name
        }
        if (u.id === data.whitePlayer) {
          data.whitePlayerName = u.name
        }
        if (data.whitePlayerName == undefined) {
          data.whitePlayerName = user.userInfo.username
        }
        if (data.blackPlayerName == undefined) {
          data.blackPlayerName = user.userInfo.username
        }
      });
      Game.setGameInfo(data);
      PlayersRoom.changeUserStatus(data.blackPlayer, 'free');
      $location.path('/game'+data.gameId)
    });


    gameSocket.on('opponentMove', function (data) {
      var gameInfo = Game.getGameInfo()
      var username;
      var color = Game.getGameColor();
      color = color === 'black' ? 'white' : 'black';
      var moveFlag = Game.getMoveFlag();;
      if(moveFlag === false) {
        moveFlag = true;
      }
      Game.setMoveFlag(moveFlag);
      Game.setGameColor(color)
      Game.move(data.form, data.to);
      Game.moves.push({user: username, form: data.form, to: data.to})
    });

  });

  $rootScope.$on('disconnectGameSocket', function(){
    gameSocket.disconnect();
    console.log('disconnected from "game" namespace');
  });
}
