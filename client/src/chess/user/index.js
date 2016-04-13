module.exports = 'chess.user';

angular.module('chess.user', [])
.factory('user', UserFactory);

UserFactory.$inject = ['$http']
function UserFactory($http) {
  var factory = {
    getUserName: getUserName,
    username: 'username',
    userId: 'userID',
    getUserStatus: getUserStatus
  };
  return factory;


  function getUserStatus() {
    $http.get(process.env.API_URL + '/api/chess', {withCredentials: true})
    // handle success
    .success(function (response) {
      console.log(response.username);
      if(response.status){
        user = true;
      } else {
        user = false;
      }
    })
    // handle error
    .error(function (data) {
      user = false;
      console.log(data);
    });
  }

  function getUserName() {
    $http.get(process.env.API_URL + '/api/chess', {withCredentials: true})
    .then(function(response) {
      factory.username = response.data.username;
      // console.log(response.data.username);
    }, function showError(response) {
      alert('some error');
    })
  }


}
