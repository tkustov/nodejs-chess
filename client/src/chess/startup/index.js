var angular = require('angular');
var ngRoute = require('angular-route');
var startupComponent = require('./startup.component');

module.exports = angular.module('chess.startup', [
  ngRoute
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