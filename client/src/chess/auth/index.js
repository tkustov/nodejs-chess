var angular = require('angular');
var ngRoute = require('angular-route');

module.exports = angular.module('chess.auth', [
  ngRoute
]).
controller('formAction', ['$scope', '$location', '$http', function($scope, $location, $http) {
	$scope.submitLoginForm = function () {
    var data = {
      username : $scope.fields.username,
      password : $scope.fields.password
    };
    /* post to server*/
    var url = process.env.API_URL + '/login';
    $http.post(url, data, {withCredentials: true})
    .success(function (data, status, headers, config) {
      $location.path( "/chess" );
      alert(status+": "+ data.message);
    })
    .error(function (data, status, headers, config) {
      alert(status+": "+ data.message);
    });
  }

  $scope.register = function() {
    var data = {
      username : $scope.fields.username,
      password : $scope.fields.password
    };
    /* post to server*/
    var url = process.env.API_URL + '/register';
    $http.post(url, data)
    .success(function (data, status, headers, config) {
      alert(status+": "+ data.message);
    })
    .error(function (data, status, headers, config) {
      alert(status+": "+ data.message);
    });
  }
}]).
controller('chessCntr', ['$scope', '$location', '$http', function($scope, $location, $http) {
  $http.get(process.env.API_URL + '/chess', { withCredentials: true })
    .success(function (data, status, headers, config) {
      $scope.username = data.username;
    })
    .error(function (data, status, headers, config) {
      $location.path("/login");
    });
  $scope.logout = function(){
    $http.post(process.env.API_URL + '/logout')
      .success(function (data, status, headers, config){
         $location.path("/");
      })
      .error(function (data, status, headers, config) {
        console.log(data);
      });
  }
}]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider', '$httpProvider'];
function RouteConfig($routeProvider, $httpProvider) {
  $routeProvider.when('/login', {
  		templateUrl: 'auth/login.html',
  		controller : 'formAction'
  	});
  //$httpProvider.defaults.withCredentials = true;
}