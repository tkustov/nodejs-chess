var angular = require('angular');
var ngRoute = require('angular-route');

module.exports = angular.module('chess.play', [
  ngRoute
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.when('/play', {
    templateUrl: 'play/play.component.html'
  });
}