module.exports = {
  controller: SettingsController,
  templateUrl: 'settings/settings.component.html'
};

SettingsController.$inject = ['user', 'Settings', '$location'];
function SettingsController( user, Settings, $location) {
  var $ctrl = this;

  $ctrl.submitPasswordForm = submitPasswordForm;
  $ctrl.deleteAccount = deleteAccount;
  $ctrl.getUserName = getUserName; 
  $ctrl.getUserScores = getUserScores; 
  $ctrl.clearPasswordForm = clearPasswordForm;
  $ctrl.closeAlert = closeAlert;  
  $ctrl.message = '';

  function submitPasswordForm(form) {
    var data = {
      currentPassword: $ctrl.currentPassword,
      newPassword: $ctrl.newPassword
    };
    Settings.changePassword(data).
      then(
        function(response) {
          clearPasswordForm(form);
          $ctrl.message = 'Your password has been successfully changed.'; },
        showError
      );
  }
  
  function deleteAccount() {
    Settings.deleteAccount().
      then(
        function(response) {
          $ctrl.message = 'Your account has been successfully deleted.';
          user.userInfo = null;
          $location.path('/'); },
        showError
      );
  }
  
  function getUserName() {
    return (user.userInfo)
      ? user.userInfo.username
      : null;
  }
  
  function getUserScores() {
    return (user.userInfo)
      ? user.userInfo.scores
      : null;
  }
  
  function clearPasswordForm(form) {
    $ctrl.currentPassword = null;
    $ctrl.newPassword = null;
    $ctrl.confirmPassword = null;
    form.$setPristine();
  }
  
  function closeAlert() {
    $ctrl.message = null;
  }
  
  function showError(response) {
    $ctrl.message = response.data.message;
  }
  
  
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
    content: 'To delete your account, please click the button below.'
  };
}
