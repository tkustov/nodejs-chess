var angular = require('angular');
var navbar = require('./navbar');
var startup = require('./startup');
var auth = require('./auth');

module.exports = angular.module('chess', [
  require('angular-route'),
  navbar.name,
  startup.name,
  auth.name,
  require('./ping')
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/' });
}
