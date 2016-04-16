var angular = require('angular');
var navbar = require('./navbar');
var startup = require('./startup');
var auth = require('./auth');
var scores = require('./scores');
var help = require('./help');
var settings = require('./settings');
var user = require('./user');
<<<<<<< HEAD
var chat = require('./chat');
=======
var ui = require('angular-ui-bootstrap');
>>>>>>> 347b0f20d35d550aa7450f9f91d2485fa430a241

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
