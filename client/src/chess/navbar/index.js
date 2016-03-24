var fs = require('fs');
var angular = require('angular');

module.exports = angular.module('chess.navbar', []).
component('navbar', {
  controller: NavbarController,
  template: fs.readFileSync(__dirname + '/navbar.component.html', 'utf-8')
});

NavbarController.$inject = []
function NavbarController() {
  var $ctrl = this;

  $ctrl.toggled = false;
  $ctrl.toggle = toggle;

  function toggle() {
    $ctrl.toggled = !$ctrl.toggled;
  }
}
