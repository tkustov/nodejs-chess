var angular = require('angular');
var ngRoute = require('angular-route');
var FindUser = require('../user')

var SocketFactory = require('../socket/socket.factory');

module.exports = angular.module('chess.startup', [
  ngRoute
]).
config(RouteConfig).
factory('Socket', SocketFactory).
component('check', {
  controller: FindUser,
  templateUrl: 'board/board.component.html'
});

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider
  .when('/', {
    controller: StartupCtrl,
    templateUrl: 'startup/view.html'
  })
  .when('/board', {
    template: '<check></check>'
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
