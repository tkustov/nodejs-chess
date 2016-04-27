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
      PlayersRoom.clearIncommingInvitations();
      console.log('Connection lost... :(');
    });

    gameSocket.on('userJoined', function(data){
      PlayersRoom.newUser(data);
    });

    gameSocket.on('userLeft', function(data){
      PlayersRoom.removeUser(data.userId);
    });

    gameSocket.on('incomingInv', function(data){
      PlayersRoom.putIncommingInvitation(data);
    });

    gameSocket.on('startGame', function(data){
      Game.setGameInfo(data);
      $location.path('/game')
    });

    gameSocket.on('opponentMove', function (data) {
      Game.move(data.form, data.to);
    });

  });

  $rootScope.$on('disconnectGameSocket', function(){
    gameSocket.disconnect();
    console.log('disconnected from "game" namespace');
  });
}
