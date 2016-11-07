(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('loginservice', loginservice);

  loginservice.$inject = ['$mdDialog', 'OAuth', '$rootScope', '$state', '$cookies'];
  /* @ngInject */
  function loginservice($mdDialog, OAuth, $rootScope, $state, $cookies) {


    var service = {
      login: loginDialog,
      logout: logout,
      isAuthenticated : isAuthenticated,
      getUserFromToken: getUserFromToken,
      cleanCookies: cleanCookies,
      setTokenExpiry: setTokenExpiry

    }
    return service;

    function loginDialog(event) {

      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: event,
        templateUrl: 'app/core/login.html',
        controller: LoginDialogController,
        controllerAs: 'vm',
        clickOutsideToClose: false
      });


      function LoginDialogController() {
        var vm = this;
        vm.user = [];
        vm.user.username = null;
        vm.user.password = null;
        vm.handleSubmit = handleSubmit;
        vm.handleCancel = handleCancel;
        vm.error = null;

        function handleSubmit(){
          OAuth
            .getAccessToken({username: vm.user.username, password: vm.user.password})
            .then(function (result) {
              setTokenExpiry();
              var token = result.data.access_token;
              $rootScope.currentUser = getUserFromToken(token);
              if($rootScope.currentState !== 'schedule') {
                $state.go($rootScope.currentState);
              }else {
                $state.go('dashboard');
              }
              return $mdDialog.hide();

            })
            .catch(function (error) {
              vm.error = 'Invalid username or password';
              console.log('error', error);
            });

        }

        function handleCancel(){
          $state.go('schedule');
          return $mdDialog.cancel();
        }

      }

    }

    function isAuthenticated() {
      return OAuth.isAuthenticated();
    }

    function logout() {
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to log out?')
        .textContent('')
        .ok('Yes')
        .cancel('No');

      $mdDialog.show(confirm).then(function() {
        cleanCookies();
        $state.go('schedule');
      }, function() {
        return;
      });
    }

    function getUserFromToken(token){
      var decoded = jwt_decode(token);
      return {
        userName : decoded.user_name,
        authorities : decoded.authorities
      };
    }

    function cleanCookies() {
      $cookies.remove('scheduleUser');
      $cookies.remove('token');
      $cookies.remove('authorities');
      $rootScope.currentUser = undefined;
    }

    function setTokenExpiry() {
      var token = $cookies.get('token');
      var expirationTime = new Date();
      expirationTime.setMinutes(expirationTime.getMinutes() + 60*3);
      $cookies.put('token', token, {
        expires: expirationTime
      });
    }

  }
})();