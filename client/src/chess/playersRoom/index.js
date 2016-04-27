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

SocketInit.$inject = ['$rootScope', '$http', 'Socket', 'user'];
function SocketInit($rootScope, $http, Socket, user) {

  var gameSocket;

  $rootScope.$on('Authorized', function(){
    //console.log('Authorized');
    gameSocket = Socket('game');

    gameSocket.on('connect', function() {
      var data = { userId: user.userInfo._id };
      gameSocket.emit('identification', data);
      user.setOnline();
      console.log('connect to "game" ns');
      $rootScope.$broadcast('SocketConnected');
    });

    gameSocket.on('disconnect', function() {
      user.setOffline();
      console.log('Connection lost... :(');
    });

    $rootScope.$broadcast('SocketInitEnd');

  });

  $rootScope.$on('userLoggedOut', function(){
    gameSocket.disconnect();
    console.log('disconnected from "game" ns');
  });

  $rootScope.$on('socketDisconnect', function(){
    gameSocket.disconnect();
    console.log('disconnected from "game" ns');
  });
}
