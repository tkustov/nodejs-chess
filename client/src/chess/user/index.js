module.exports = 'chess.user';

angular.module('chess.user', [])
.factory('user', UserFactory);

UserFactory.$inject = ['$http']
function UserFactory($http) {
  var factory = {
    username: 'test',
    userId: 'userID',
    // getUserStatus: getUserStatus
  };
  return factory;

  // function getUserStatus() {
  //   $http.get(process.env.API_URL + '/api/user/name/', {withCredentials: true})
  //   // handle success
  //   .success(function (response) {
  //     console.log(response.username);
  //     if(response.status){
  //       user = true;
  //     } else {
  //       user = false;
  //     }
  //   })
  //   // handle error
  //   .error(function (data) {
  //     user = false;
  //     console.log(data);
  //   });
  // }

  // function getUserName() {
  //   $http.get(process.env.API_URL + '/api/user/name/', {withCredentials: true})
  //   .then(function(response) {
  //     console.log(factory);
  //     console.log(factory.username);
  //     console.log('factory');
  //     factory.username = response.data.username;
  //     console.log(factory.username);
  //         }, error)
  // };

  // function error(response) {
  //   console.log(response.status + ' ' + response.statusText);
  // };
}
