var angular = require('angular');
var ngRoute = require('angular-route');
//var SocketFactory = require('../socket/socket.factory');
module.exports =angular.module('chess.startup',['ui.bootstrap']);

module.exports = angular.module('chess.startup', [
  ngRoute
]).
config(RouteConfig);
//factory('Socket', SocketFactory);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider
  .when('/', {
    controller: StartupCtrl,
    templateUrl: 'startup/view.html'
   });
}

StartupCtrl.$inject = [];
function StartupCtrl (){
  /*var $ctrl = this;
  $ctrl.myInterval = 3000;
  $ctrl.slides = [
    {
      image: 'https://www.flowersmadeeasy.com/images/Untitled-3.jpg'
    },
    {
      image: 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=44977624'
    },
    {
      image: 'http://www.flower-arrangement-advisor.com/images/pink_hyacinth_flower.jpg'
    },
    {
      image: 'http://floristschennai.com/images/rose-cat.jpg'
    }
  ];*/
};