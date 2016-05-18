var angular = require('angular');
var ngRoute = require('angular-route');
var StartupComponent = require('./startup.component');

module.exports = angular.module('chess.startup', [
  ngRoute
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

RunFunction.$inject = ['user', '$rootScope'];
function RunFunction(user, $rootScope) {
  user.getUserInfo().then(function () {
    $rootScope.$broadcast('Authorized');
  });
}