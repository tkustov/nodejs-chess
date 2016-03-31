module.exports = {
  controller: AuthController,
  templateUrl: 'auth/auth.component.html'
};

AuthController.$inject = ['$location', 'auth'];
function AuthController($location, auth) {
	var $ctrl = this;

	$ctrl.submitLoginForm = submitLoginForm;
  $ctrl.submitRegisterForm = submitRegisterForm;
  $ctrl.username = null;
  $ctrl.password = null;

  function showError(response) {
    alert('Error ' + response.status + ': ' + response.data.message);
  }
	function submitLoginForm() {
		var data = {
      username : $ctrl.username,
      password : $ctrl.password
    };
    auth.login(data)
    .then(
      function (message) {
        $location.path( "/chess" );
        alert('Welcome' + ' ' + data.username)
      },
    showError)
  }
  function submitRegisterForm() {
    var data = {
      username : $ctrl.username,
      password : $ctrl.password
    };
    auth.register(data)
    .then(
      function (message) {
        alert(message);
      },
    showError)
  }
};

