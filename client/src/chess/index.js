var angular = require('angular');
var ngRoute = require('angular-route');
var startup  =require('./startup');
var auth = require('./auth');

module.exports = angular.module('chess', [
  ngRoute,
  startup.name,
  auth.name
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/' });
}
