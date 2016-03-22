var angular = require('angular');
var ngRoute = require('angular-route');
var startup  =require('./startup');

module.exports = angular.module('chess', [
  ngRoute,
  startup.name
]).
config(RouteConfig).
run(TestCORS);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/' });
}

TestCORS.$inject = ['$http'];
function TestCORS($http) {
  $http.post(process.env.API_URL + '/ping', { withCredentials: true });
}
