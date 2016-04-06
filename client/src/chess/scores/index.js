var angular = require('angular');
var ngRoute = require('angular-route');

module.exports = angular.module('chess.scores', [
  ngRoute
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.when('/scores', {
    templateUrl: 'scores/scores.component.html'
    //controller: ScoresController
  });
};
/*ScoresController.$inject = ['$http'];
function AuthController($location, auth) {
	$http.get('/api/records')
	.then(function(response) {
	$scope.records = response.data;
});
}*/