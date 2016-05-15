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
    return user.userInfo && user.userInfo.username;
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
  
  
  $ctrl.group1 = {
    title: 'Change password',
    field1: 'Current password',
    field2: 'New password',
    field3: 'Confirm password',
  };
  $ctrl.group2 = {
    title: 'Delete account',
    content: 'To delete your account, please click the button below.'
  };
}
