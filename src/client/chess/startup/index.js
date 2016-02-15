import angular from 'angular';
import ngRoute from 'angular-route';

export default angular.module('chess.startup', [
  ngRoute
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'startup/view.html'
  });
}
