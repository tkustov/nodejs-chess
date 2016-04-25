module.exports = SettingsFactory;

SettingsFactory.$inject = ['$http'];
function SettingsFactory($http) {
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
    return $http.delete(process.env.API_URL + '/api/user/account', {withCredentials: true})
      .then(
        function(response) {
          return response.status + ' ' + response.statusText;
        }  
      );
  }
}