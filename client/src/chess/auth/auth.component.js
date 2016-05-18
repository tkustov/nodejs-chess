module.exports = {
  login : {
    controller: AuthController,
    templateUrl: 'auth/login.component.html'
  },
  register: {
    controller: AuthController,
    templateUrl: 'auth/register.component.html'
  }
};

AuthController.$inject = ['$location', 'auth', 'user', '$rootScope'];
function AuthController($location, auth, user, $rootScope) {
	var $ctrl = this;

	$ctrl.submitLoginForm = submitLoginForm;
  $ctrl.submitRegisterForm = submitRegisterForm;
  $ctrl.username = null;
  $ctrl.password = null;
  $ctrl.error = null;

  function showError(response) {
    $ctrl.error = true;
    $ctrl.errorMessage = response.data.message;
  }
	function submitLoginForm() {
		var data = {
      username : $ctrl.username,
      password : $ctrl.password
    };
    auth.login(data)
      .then(function(message) {
        user.getUserInfo().then(function () {
          $rootScope.$broadcast('Authorized');
        });
      })
        .then(function (message) {
            $location.path( "/players-room" );
          },
        showError)
      }
  function submitRegisterForm() {
    var data = {
      email: $ctrl.email,
      username : $ctrl.username,
      password : $ctrl.password
    };
    auth.register(data)
      .then(function(message) {
        user.getUserInfo().then(function () {
          $rootScope.$broadcast('Authorized');
        });
      })
        .then(
          function (message) {
            $location.path( "/players-room" );
          },
        showError)
  }
};
