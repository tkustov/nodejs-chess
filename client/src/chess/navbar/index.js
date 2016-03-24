var angular = require('angular');

module.exports = angular.module('chess.navbar', []).
component('navbar', {
  controller: NavbarController,
  templateUrl: 'navbar/navbar.component.html'
});

NavbarController.$inject = []
function NavbarController() {}
