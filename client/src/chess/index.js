var angular = require('angular');
var ngRoute = require('angular-route');
var startup  =require('./startup');

module.exports = angular.module('chess', [
  ngRoute,
  startup.name
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/' });
}
