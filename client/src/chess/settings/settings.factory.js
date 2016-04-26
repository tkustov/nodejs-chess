module.exports = SettingsFactory;

SettingsFactory.$inject = ['$http', '$rootScope'];
function SettingsFactory($http, $rootScope) {
  return {
    changePassword: changePassword,
    deleteAccount: deleteAccount
  };

  function changePassword(data) {
     return $http.put(process.env.API_URL + '/api/user/password', data, {withCredentials: true})
      .then(
        function(response) {
          return response.status + ' ' + response.statusText;
        }
      );
  }

  function deleteAccount() {
    $rootScope.$broadcast('socketDisconnect');
    return $http.delete(process.env.API_URL + '/api/user/account', {withCredentials: true})
      .then(
        function(response) {
          return response.status + ' ' + response.statusText;
        }
      );
  }
}
