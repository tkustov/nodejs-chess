module.exports = PlayersRoomFactory;

PlayersRoomFactory.$inject = ['$http'];
function PlayersRoomFactory($http) {
  var usersOnline = [];
  var incommingInvitations = [];

  function fetchUsersOnline () {
    $http.get(process.env.API_URL + '/api/user/users-online/', {withCredentials: true})
    .then(function(response) {
      response.data.forEach(function(user){
        newUser(user);
      })
    });
  }

  function getUsersOnline() {
    return usersOnline;
  }

  function newUser(user){    
    var isUserExist = usersOnline.some(function(u){
      return u.id === user.id;
    });

    if (!isUserExist) {
      user.status = 'free';
      usersOnline.push(user);
    }
  }

  function removeUser(userId){
    usersOnline = usersOnline.filter(function(u){
      return u.id !== userId;
    });
  }

  function changeUserStatus (userId, status) {
    usersOnline = usersOnline.map(function(u){
      if (u.id == userId) {u.status = status}
      return u;
    });
  }


  function clearUsersOnline() {
    usersOnline = [];
  }

  function getInvitations() {
    return incommingInvitations;
  }

  function putInvitation(invitation) {
    incommingInvitations.push(invitation);
  }

  function removeInvitationFromUser(userId) {
    incommingInvitations = incommingInvitations.filter(function(u){
      return u.userId !== userId;
    });
  }

  function clearInvitations() {
    incommingInvitations = [];
  }
  
  var factory = {
    fetchUsersOnline: fetchUsersOnline,
    getUsersOnline: getUsersOnline,
    newUser: newUser,
    removeUser: removeUser,
    changeUserStatus: changeUserStatus,
    clearUsersOnline: clearUsersOnline,
    getInvitations: getInvitations,
    putInvitation: putInvitation,
    removeInvitationFromUser: removeInvitationFromUser,
    clearInvitations: clearInvitations
  };

  return factory;
}
