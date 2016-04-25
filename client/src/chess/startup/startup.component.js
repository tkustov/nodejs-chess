module.exports = {
  controller: StartupController,
  templateUrl: 'startup/startup.component.html'
};

StartupController.$inject = [];
function StartupController (){
  var $ctrl = this;
  $ctrl.myInterval = 4000;
  $ctrl.active = 0;
  $ctrl.slides = [
    {
      id: 0,
      image: 'assets/images/1.jpg'
    },
    {
      id: 1,
      image: 'assets/images/2.jpg'
    },
    {
      id: 2,
      image: 'assets/images/3.jpg'
    },
    {
      id: 3,
      image: 'assets/images/4.jpg'
    }
  ];
}
  