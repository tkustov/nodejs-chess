module.exports = PlayersRoomFactory;

PlayersRoomFactory.$inject = ['$http'];
function PlayersRoomFactory($http) {
  var usersOnline = [];
  var incommingInvitations = [];

  function fetchUsersOnline () {
    $http.get(process.env.API_URL + '/api/user/users-online/', {withCredentials: true})
    .then(function(response) {
      usersOnline = response.data;
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
      usersOnline.push(user);
    }
  }

  function removeUser(userId){
    usersOnline = usersOnline.filter(function(u){
      return u.id !== userId;
    });
  }

  function clearUsersOnline() {
    usersOnline = [];
  }

  function getIncommingInvitations() {
    return incommingInvitations;
  }

  function putIncommingInvitation(invitation) {
    incommingInvitations.push(invitation);
  }

  function clearIncommingInvitations() {
    incommingInvitations = [];
  }
  
  var factory = {
    fetchUsersOnline: fetchUsersOnline,
    getUsersOnline: getUsersOnline,
    newUser: newUser,
    removeUser: removeUser,
    clearUsersOnline: clearUsersOnline,
    putIncommingInvitation: putIncommingInvitation,
    getIncommingInvitations: getIncommingInvitations,
    clearIncommingInvitations: clearIncommingInvitations
  };

  return factory;
}
