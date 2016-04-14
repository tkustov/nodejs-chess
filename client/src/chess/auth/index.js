var angular = require('angular');
var ngRoute = require('angular-route');
var AuthComponent = require('./auth.component');
var AuthFactory = require('./auth.factory');

module.exports = 'chess.auth';

angular.module('chess.auth', [
  ngRoute
]).
config(RouteConfig).
config(AuthConfig).
component('auth', AuthComponent.login).
factory('auth', AuthFactory).
component('register', AuthComponent.register).
factory('register', AuthFactory);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider
  .when('/login', {
		template: '<auth></auth>'
	})
  .when('/register', {
    template: '<register></register>'
  });
};

AuthConfig.$inject = ['$httpProvider'];
function AuthConfig ($httpProvider) {
  AuthInterceptor.$inject = ['$injector'];
  function AuthInterceptor($injector) {
    return {
      responseError: function(rejection) {
        var $q = $injector.get('$q');
        var $location = $injector.get('$location');

        if (rejection.status === 401) {
          $location.path('/login');
        }
        return $q.reject(rejection);
      }
    };
  }
  $httpProvider.interceptors.push(AuthInterceptor);
}


