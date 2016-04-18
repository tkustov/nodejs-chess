var angular = require('angular');
var ngRoute = require('angular-route');

module.exports = angular.module('chess.chat', [
  //ngRoute
]).
//config(RouteConfig).
component('chat', {
  controller: ChatController,
  templateUrl: 'chat/chat.component.html'
});
// RouteConfig.$inject = ['$routeProvider'];
// function RouteConfig($routeProvider) {
//   $routeProvider.when('/board', {
//     templateUrl: 'chat/chat.component.html'
//   });
// }

function ChatController(){
	console.log('Chat Controller');

}