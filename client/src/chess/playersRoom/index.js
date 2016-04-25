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

SocketInit.$inject = ['$rootScope', 'Socket', '$http'];
function SocketInit($rootScope, Socket, $http) {
  
  $rootScope.$on('userLoggedIn', function(){
    $http.get(process.env.API_URL + '/api/user/room/', {withCredentials: true})
    .then(function(response) {

      var userRoom = response.data.userRoom.toString();
      var gameSocket = Socket('game');

      gameSocket.on('connect', function(data) {
        gameSocket.emit('join', userRoom);
        console.log('connect to "game" ns and userRoom');
        // $ctrl.status = 'Connected :)'
      });

      gameSocket.on('disconnect', function(data) {
        console.log('Connection lost... :(');
        // $ctrl.status = 'Disconnected :(';
      });

      $rootScope.$on('userLoggedOut', function(){
        gameSocket.disconnect();
        console.log('disconnect from "game" ns');
      });

    });
  });
}
