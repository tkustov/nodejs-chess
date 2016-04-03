var angular = require('angular');
var ngRoute = require('angular-route');

var SocketFactory = require('../socket/socket.factory');

module.exports = angular.module('chess.startup', [
  ngRoute
]).
config(RouteConfig).
factory('Socket', SocketFactory);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider
  .when('/', {
    controller: StartupCtrl,
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

  function showError(response) {
    $location.path("/login");
    alert('You must login');
  }

  $http.get(process.env.API_URL + '/api/chess', {withCredentials: true}).
  then(function(response) {
    $ctrl.username = response.data.username;
  }, showError)
}

StartupCtrl.$inject = ['Socket'];
function StartupCtrl (Socket){
  var generalBUS = Socket();

  generalBUS.on('connect', function () {
    console.log('connected to generalBUS!');
  });

  generalBUS.on('msg', function (data) {
    console.log('data from generalBUS: ', data);
  });

};
