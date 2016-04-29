var angular = require('angular');
var ngRoute = require('angular-route');
var SettingsComponent = require('./settings.component');
var SettingsFactory = require('./settings.factory');

module.exports = angular.module('chess.settings', [
  ngRoute,
  require('../user')
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