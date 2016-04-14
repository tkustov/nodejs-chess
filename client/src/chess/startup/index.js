var angular = require('angular');
var ngRoute = require('angular-route');
var SocketFactory = require('../socket/socket.factory');

module.exports = angular.module('chess.startup', [
  ngRoute
]).
config(RouteConfig).
factory('Socket', SocketFactory);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider
  .when('/', {
    controller: StartupCtrl,
    templateUrl: 'startup/view.html'
   });
}

StartupCtrl.$inject = [];
function StartupCtrl (){
  console.log('StartupCtrl');
};
