var angular = require('angular');
var ngRoute = require('angular-route');
var startupComponent = require('./startup.component')
var ui = require('angular-ui-bootstrap');
var ngAimate = require('angular-animate');

module.exports = angular.module('chess.startup', [
  ngRoute,
  ui,
  ngAimate

]).
config(RouteConfig).
component('startup', startupComponent);


RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider
  .when('/', {
    template: '<startup></startup>'
  });
}