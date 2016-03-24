var fs = require('fs');
var angular = require('angular');
var ngRoute = require('angular-route');

module.exports = angular.module('chess.startup', [
  ngRoute
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.when('/', {
    template: fs.readFileSync(__dirname + '/view.html', 'utf-8')
  });
}
