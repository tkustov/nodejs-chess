var angular = require('angular');
var ngRoute = require('angular-route');

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

FindUser.$inject = ['$http']
function FindUser($http) {
  var $ctrl = this;

  $ctrl.username = null;

  function showError(response) {
    alert('You must login');
  }

  $http.get(process.env.API_URL + '/api/chess', {withCredentials: true}).
  then(function(response) {
    $ctrl.username = response.data.username;
  }, showError)
}
