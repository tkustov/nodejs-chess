var angular = require('angular');
var ngRoute = require('angular-route');

module.exports = angular.module('chess.startup', [
  ngRoute
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'startup/view.html'
  })
  .when('/login', {
  	templateUrl: 'startup/login.html',
  	controller : 'formAction'
  })
  .when('/chess', {
    templateUrl: 'startup/chess.html',
    controller: 'chessCntr'
  });
}
