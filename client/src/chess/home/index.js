var angular = require('angular');
var ngRoute = require('angular-route');

module.exports = angular.module('chess.home', [
  ngRoute
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home/home.html'
  })
  .when('/play', {
    controller: CheckAuth,
    templateUrl: 'play/play.component.html'
  });
}

CheckAuth.$inject = ['$http', '$location']
function CheckAuth($http, $location) {
  var $ctrl = this;

  $ctrl.username = null;

  function showError(response) {
    $location.path("/login");
    console.log('You must login');
  }

  $http.get(process.env.API_URL + '/api/chess', {withCredentials: true}).
  then(function(response) {
    $ctrl.username = response.data.username;
  }, showError)
}
