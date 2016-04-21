var angular = require('angular');
var ngRoute = require('angular-route');
var StartupComponent = require('./startup.component');
var ui = require('angular-ui-bootstrap');
var ngAnimate = require('angular-animate');

module.exports = angular.module('chess.startup', [
  ngRoute,
  ngAnimate,
  ui
]).
config(RouteConfig).
component('startup', StartupComponent);


RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider
  .when('/', {
    template: '<startup></startup>'
  });
}