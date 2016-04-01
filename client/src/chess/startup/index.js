var angular = require('angular');
var ngRoute = require('angular-route');

module.exports = angular.module('chess.startup', [
  ngRoute
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'startup/view.html'
  })
  .when('/chess', {
    controller: CheckAuth,
    templateUrl: 'startup/chess.html'
  });
}

CheckAuth.$inject = ['$http', '$location']
function CheckAuth($http, $location) {
  var $ctrl = this;

  $ctrl.username = null;
  console.log($ctrl.username)

  function showError(response) {
    $location.path("/login");
    console.log('You must login');
  }

  $http.get(process.env.API_URL + '/api/chess', {withCredentials: true}).
  then(function(response) {
    $ctrl.username = response.data.username;
    console.log($ctrl.username);
  }, showError)
}
