module.exports = SettingsFactory;

SettingsFactory.$inject = ['$http', '$rootScope', 'user'];
function SettingsFactory($http, $rootScope, user) {
  return {
    changePassword: changePassword,
    deleteAccount: deleteAccount
  };

  function changePassword(data) {
     return $http.put(process.env.API_URL + '/api/user/password', data, {withCredentials: true}).
      then(function(response) {
        return response.status + ' ' + response.statusText;
      });
  }
  
  function deleteAccount() {
    $rootScope.$broadcast('userLoggedOut');
    return $http.delete(process.env.API_URL + '/api/user/account', {withCredentials: true}).
      then(function(response) {
        return response.status + ' ' + response.statusText;
      });
  }
}
