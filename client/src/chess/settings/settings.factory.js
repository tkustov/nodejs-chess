module.exports = SettingsFactory;

SettingsFactory.$inject = ['$http'];
function SettingsFactory($http) {
  return {
    changePassword: changePassword
  };
  
  function changePassword(data) {
     return $http.post(process.env.API_URL + '/api/user/password', data, {withCredentials: true})
      .then(
        function(response) {
          return response.status + ' ' + response.statusText;
        }  
      );
  }
}