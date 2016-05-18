var angular = require('angular');
var ngRoute = require('angular-route');
var PlayersRoomComponent = require('./playersRoom.component');
var PlayersRoomFactory = require('./playersRoom.factory');
var SocketFactory = require('../socket/socket.factory');
var SoundsFactory = require('../sounds/sounds.factory');

module.exports = 'chess.playersRoom';

angular.module('chess.playersRoom', [
  ngRoute,
  require('../user'),
  require('../game').name
]).
run(SocketInit).
config(RouteConfig).
factory('PlayersRoom', PlayersRoomFactory).
factory('Socket', SocketFactory).
factory('SoundsFactory', SoundsFactory).
component('playersroom', PlayersRoomComponent);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.when('/players-room', {
    template: '<playersroom></playersroom>'
  });
}

SocketInit.$inject = ['$rootScope', '$location', 'Socket', 'user', 'PlayersRoom', 'Game', 'SoundsFactory'];
function SocketInit($rootScope, $location, Socket, user, PlayersRoom, Game, SoundsFactory) {

  var gameSocket;

  $rootScope.$on('Authorized', function(){
    gameSocket = Socket('game');

    gameSocket.on('connect', function() {
      gameSocket.emit('identification', { userId: user.userInfo._id });
      user.setOnline();
      PlayersRoom.fetchUsersOnline();
    });

    gameSocket.on('disconnect', function() {
      user.setOffline();
      PlayersRoom.clearUsersOnline();
      PlayersRoom.clearInvitations();
      SoundsFactory.play('horseWhinnies');
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
      SoundsFactory.play('incomingInv');
    });

    gameSocket.on('cancelInv', function(data){
      PlayersRoom.removeInvitationFromUser(data.userId);
    });

    gameSocket.on('refuseInv', function(data){
      PlayersRoom.changeUserStatus(data.userId, 'free');
    });

    gameSocket.on('startGame', function(data){
      PlayersRoom.getUsersOnline().forEach(function(u){
        if (u.id === data.blackPlayer) {
          data.blackPlayerName = u.name;
        }
        if (u.id === data.whitePlayer) {
          data.whitePlayerName = u.name;
        }
        if (data.whitePlayerName == undefined) {
          data.whitePlayerName = Game.whitePlayerName;
        }
        if (data.blackPlayerName == undefined) {
          data.blackPlayerName = Game.blackPlayerName;
        }
      });
      Game.setGameInfo(data);
      PlayersRoom.changeUserStatus(data.blackPlayer, 'free');
      SoundsFactory.play('startGame');
      $location.path('/game/'+data.gameId)
    });

    gameSocket.on('opponentMove', function (data) {
      var moveFlag = Game.getMoveFlag();;
      if(moveFlag === false) {
        moveFlag = true;
      }
      Game.setMoveFlag(moveFlag);
      Game.setFactoryMoves({user: 'Your', form: data.form, to: data.to});
      Game.move(data.form, data.to);
      SoundsFactory.play('pieceMove');
    });
  });

  $rootScope.$on('userLoggedOut', function(){
    gameSocket.disconnect();
  });
}
