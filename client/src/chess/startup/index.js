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
run(RunFunction).
component('startup', StartupComponent);


RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider
  .when('/', {
    template: '<startup></startup>'
  });
}

RunFunction.$inject = ['user'];
function RunFunction(user) {
  user.getUserInfo();
}