var angular = require('angular');
var ngRoute = require('angular-route');
var SettingsComponent = require('./settings.component');
var SettingsFactory = require('./settings.factory');
var ui = require('angular-ui-bootstrap');
var ngAnimate = require('angular-animate');

module.exports = angular.module('chess.settings', [
  ngRoute,
  ngAnimate,
  ui
]).
config(RouteConfig).
component('settings', SettingsComponent).
factory('Settings', SettingsFactory);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider
    .when('/settings', {
      template: '<settings></settings>'
  });
}