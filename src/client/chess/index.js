import angular from 'angular';
import ngRoute from 'angular-route';
import startup from './startup';

export default angular.module('chess', [
  ngRoute,
  startup.name
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/' });
}
