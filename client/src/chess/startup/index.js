var angular = require('angular');
var ngRoute = require('angular-route');
var FindUser = require('../user');

module.exports = angular.module('chess.startup', [
  ngRoute
]).
config(RouteConfig).
component('check', {
  controller: FindUser,
  templateUrl: 'startup/chess.html'
});

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'startup/view.html'
  })
  .when('/chess', {
    template: '<check></check>'
  });
}