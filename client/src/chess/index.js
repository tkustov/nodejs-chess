var angular = require('angular');
var navbar = require('./navbar');
var startup = require('./startup');
var auth = require('./auth');
var scores = require('./scores');
var help = require('./help');

module.exports = angular.module('chess', [
  require('angular-route'),
  navbar.name,
  startup.name,
  auth.name,
  scores.name,
  help.name,
  require('./ping'),
  require('./board')
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/' });
}
