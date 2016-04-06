var angular = require('angular');
var ngRoute = require('angular-route');

module.exports = angular.module('chess.help', [
  ngRoute
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.when('/help', {
    templateUrl: 'help/help.component.html'
  });
}