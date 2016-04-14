var angular = require('angular');
var ngRoute = require('angular-route');

module.exports = angular.module('chess.scores', [
  ngRoute
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.when('/scores', {
    controller: ScoresController,
    templateUrl: 'scores/scores.component.html'
  });
};
function ScoresController(){
  var ctrl = this;
  ctrl.scores = document.getElementsByTagName("td"); 

	for (var i = 0; i < ctrl.scores.length; i++) {
		if(ctrl.scores[i].innerHTML === "Available"){
			ctrl.scores[i].classList.add("checked");
		}
	}
}