var angular = require('angular');
var ngRoute = require('angular-route');
var FindUser = require('../user')

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
   });
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
