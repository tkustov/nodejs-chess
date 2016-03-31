var angular = require('angular');
var ngRoute = require('angular-route');
var AuthComponent = require('./auth.component');
var AuthFactory = require('./auth.factory');

module.exports = angular.module('chess.auth', [
  ngRoute
]).
config(RouteConfig).
component('auth', AuthComponent).
factory('auth', AuthFactory);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.when('/login', {
  		template: '<auth>'
  	});
};