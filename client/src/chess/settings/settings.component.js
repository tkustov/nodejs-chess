module.exports = {
  controller: SettingsController,
  templateUrl: 'settings/settings.component.html'
};

SettingsController.$inject = ['user', 'Settings'];
function SettingsController(user, Settings) {
  var $ctrl = this;
  
  
  $ctrl.submitPasswordForm = submitPasswordForm;
  $ctrl.user = null;
  $ctrl.message = '';
  user.getUserData()
    .then(
      function(response) {
        $ctrl.user = response.data;
      },
      showError);
  //$ctrl.user.avatar = 'assets/images/avatar.png';
  //$ctrl.user.score = 2520;
  $ctrl.group1 = {
    title: 'Change your avatar',
    content: '',
    upload: 'Upload'
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

  
  
  function submitPasswordForm() {
    var data = {
      currentPassword: $ctrl.currentPassword,
      newPassword: $ctrl.newPassword
    };
    console.log(data);
    Settings.changePassword(data)
      .then(
        function(response) {
           $ctrl.message = 'Your password has been successfully changed';
        },
        showError);
  }
  
  function showError(response) {
    $ctrl.message = 'Error ' + response.status + ' ' + response.statusText;
  }
}
  
//   var ctrl = this;
//   ctrl.photobutton = document.getElementById("photobutton");
//   ctrl.photobutton.addEventListener("click", photoShow);
//   function photoShow(){
//     ctrl.photodiv = document.getElementById("photo");
//     if(ctrl.photodiv.style.display === "none"){
//       ctrl.photodiv.style.display = "block";
//     }else{
//       ctrl.photodiv.style.display = "none";
//     }
// }
// ctrl.passbutton = document.getElementById("passbutton");
//   ctrl.passbutton.addEventListener("click", passShow);
//   function passShow(){
//     ctrl.passdiv = document.getElementById("password_modal");
//     if(ctrl.passdiv.style.display === "none"){
//       ctrl.passdiv.style.display = "block";
//     }else{
//       ctrl.passdiv.style.display = "none";
//     }
//   }
// }