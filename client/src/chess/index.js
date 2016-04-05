var angular = require('angular');
var navbar = require('./navbar');
var auth = require('./auth');
var home = require('./home');
var play = require('./play');

module.exports = angular.module('chess', [
  require('angular-route'),
  navbar.name,
  auth.name,
  home.name,
  auth.name,
  play.name,
  require('./ping'),
  require('./board')
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/' });
}
