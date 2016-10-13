(function () {
  'use strict';

  angular
    .module('app.login', ['ngMaterial'])
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$q', 'logger', 'OAuth', '$cookies'];

  function LoginController($q, logger, OAuth, $cookies) {
    if (!OAuth.isAuthenticated()) {
      OAuth
        .getAccessToken({username: 'user', password: 'password'})
        .then(function (result) {
          console.log(result);
          //$cookies.put('token', JSON.stringify(result.data));
          console.log($cookies.getAll());
        })
        .catch(function (error) {
          console.log('error', error);
        });
    } else {
      alert('OK');
    }
  }
})();