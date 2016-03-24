var angular = require('angular');
var navbar = require('./navbar');
var startup = require('./startup');

module.exports = angular.module('chess', [
  require('angular-route'),
  navbar.name,
  startup.name,
  require('./ping')
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/' });
}
