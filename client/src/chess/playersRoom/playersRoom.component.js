module.exports = {
  controller: PlayersRoomController,
  templateUrl: 'playersRoom/playersRoom.component.html'
};

PlayersRoomController.$inject = ['PlayersRoom', 'user', 'SoundsFactory'];
function PlayersRoomController(PlayersRoom, user, SoundsFactory) {
  var $ctrl = this;

  $ctrl.usersOnline = PlayersRoom.getUsersOnline;
  $ctrl.incommingInvitations = PlayersRoom.getInvitations;
  $ctrl.isOnline = user.isOnline;
  $ctrl.sendInvitation = function(userId){
    PlayersRoom.sendInvitation(userId);
  };
  $ctrl.cancelInvitation = function(userId) {
    PlayersRoom.cancelInvitation(userId);
    SoundsFactory.play('cancelRefuseInv');
  };
  $ctrl.acceptInvitation = function(userId) {
    PlayersRoom.acceptInvitation(userId);
  };
  $ctrl.refuseInvitation = function(userId) {
    PlayersRoom.refuseInvitation(userId)
    SoundsFactory.play('cancelRefuseInv');
  };
}
