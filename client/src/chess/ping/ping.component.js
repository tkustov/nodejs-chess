var fs = require('fs');

module.exports = {
  controller: PingController,
  template: fs.readFileSync(__dirname + '/ping.component.html', 'utf-8')
};

PingController.$inject = ['Ping'];
function PingController(Ping) {
  var $ctrl = this;

  $ctrl.cookie = { name: 'test', value: 'test' };
  $ctrl.getPing = getPing;
  $ctrl.postPing = postPing;
  $ctrl.setCookie = setCookie;

  function showError(response) {
    alert('Error ' + response.status + ': ' + response.statusText);
  }

  function getPing() {
    Ping.get().
      then(
        function (message) { alert(message); },
        showError
      )
  }

  function postPing() {
    Ping.post().
      then(
        function (message) { alert(message); },
        showError
      );
  }

  function setCookie() {
    Ping.setCookie($ctrl.cookie.name, $ctrl.cookie.value).
      then(
        function (message) { alert(message); },
        showError
      );
  }
}
