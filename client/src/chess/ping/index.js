var angular = require('angular');
var ngRoute = require('angular-route');
var PingComponent = require('./ping.component');
var PingFactory = require('./ping.factory');

module.exports = 'chess.ping';

angular.module('chess.ping', [
  ngRoute
]).
config(RouteConfig).
factory('Ping', PingFactory).
component('ping', PingComponent);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.when('/ping', {
    template: '<ping></ping>'
  });
}
