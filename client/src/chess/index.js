var angular = require('angular');
var navbar = require('./navbar');
var startup = require('./startup');
var auth = require('./auth');
var scores = require('./scores');
var help = require('./help');
var settings = require('./settings');
var user = require('./user');
var chat = require('./chat');
var ui = require('angular-ui-bootstrap');

module.exports = angular.module('chess', [
  require('angular-route'),
  require('angular-animate'),
  navbar.name,
  ui,
  startup.name,
  auth,
  user,
  scores.name,
  help.name,
  settings.name,
  chat.name,
  require('./ping'),
  require('./playersRoom'),
  require('./board')
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/' });
}
