module.exports = {
  controller: SettingsController,
  templateUrl: 'settings/settings.component.html'
};

SettingsController.$inject = ['user', 'Settings'];
function SettingsController( user, Settings) {
  var $ctrl = this;


  $ctrl.submitPasswordForm = submitPasswordForm;
  $ctrl.clearPasswordForm = clearPasswordForm;
  $ctrl.deleteAccount = deleteAccount;
  $ctrl.message = '';
  $ctrl.getUserName = function() {

     return (user.userInfo)
      ? user.userInfo.username
      : null;
  };

  $ctrl.getUserScores = function() {
     return (user.userInfo)
      ? user.userInfo.scores
      : null;
  };

  $ctrl.closeAlert = function() {
    $ctrl.message = null;
  };

  $ctrl.group2 = {
    title: 'Change password',
    field1: 'Current password',
    field2: 'New password',
    field3: 'Confirm password',
  };

  $ctrl.group3 = {
    title: 'Theme',
    content: {
      theme1: 'Cerulean',
      theme2: 'Cosmo',
      theme3: 'Cyborg'
    }
  };

  $ctrl.group4 = {
    title: 'Language',
    content: {
      en: 'English',
      uk: 'Ukrainian',
      ru: 'Russian'
    }
  };

  $ctrl.group5 = {
    title: 'Delete account',
    content: 'To delete your account, please click the button below'
  };

  function submitPasswordForm(form) {
    var data = {
      currentPassword: $ctrl.currentPassword,
      newPassword: $ctrl.newPassword
    };
    Settings.changePassword(data)
      .then(function(response) {
        clearPasswordForm(form);
        $ctrl.message = 'Your password has been successfully changed';
      },
        showError);
  }

  function clearPasswordForm(form) {
    $ctrl.currentPassword = null;
    $ctrl.newPassword = null;
    $ctrl.confirmPassword = null;
    form.$setPristine();
  }

  function deleteAccount() {
    Settings.deleteAccount()
      .then(function(response) {
        $ctrl.message = 'Your account has been successfully deleted';
      },
        showError);
  }

  function showError(response) {
    $ctrl.message = 'Error ' + response.status + ' ' + response.statusText;
  }
}

