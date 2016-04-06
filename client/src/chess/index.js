var angular = require('angular');
var navbar = require('./navbar');
var auth = require('./auth');
var startup = require('./startup');
//var home = require('./home');

module.exports = angular.module('chess', [
  require('angular-route'),
  navbar.name,
  auth.name,
  //home.name,
  auth.name,
  startup.name,
  require('./board')
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/' });
}
