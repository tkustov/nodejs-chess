var angular = require('angular');
var ngRoute = require('angular-route');
var AuthComponent = require('../auth/auth.component');

module.exports = angular.module('chess.startup', [
  ngRoute
]).
config(RouteConfig).
component('logout', {
  controller: AuthController,
  templateUrl: 'startup/chess.html'
});

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'startup/view.html'
  })
  .when('/chess', {
    template: '<logout>'
  });
}

// *********** перенести в => auth

AuthController.$inject = ['$location', '$http'];
function AuthController($location, $http) {
  var $ctrl = this;

  $ctrl.logout = logout;
  $ctrl.username = null;

  function showError(response) {
    $location.path("/login");
    alert('You must login');
  }

  $http.get(process.env.API_URL + '/api/chess', {withCredentials: true}).
  then(function(response) {
    $ctrl.username = response.data.username;
  }, showError)

  function logout() {
    $http.post(process.env.API_URL + '/logout', null, {withCredentials: true}).
    then(function (data, status, headers, config){
      $location.path("/");
    }, showError)
  }
}