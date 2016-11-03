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
      isAuthenticated : isAuthenticated

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
              var token = result.data.access_token;
              var decoded = jwt_decode(token);
              assignCurrentUser(decoded.user_name, decoded.authorities);
              if($rootScope.currentState !== 'calendarshell.filterpannel') {
                $state.go($rootScope.currentState);
              }else {
                $state.reload();
              }
              return $mdDialog.hide();

            })
            .catch(function (error) {
              vm.error = 'Invalid username or password';
              console.log('error', error);
            });

        }

        function handleCancel(){
          ($rootScope.redirectTo || $rootScope.previousState);
          return $mdDialog.cancel();
        }

      }

    }

    function isAuthenticated() {
      return OAuth.isAuthenticated();
    }

    function assignCurrentUser (user_name, authorities) {
      $cookies.put('scheduleUser', user_name);
      $cookies.put('authorities', authorities);
      var user = {
        userName : user_name,
        authorities : authorities
      };
      $rootScope.currentUser = user;
      return user;
    }

    function logout() {
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to log out?')
        .textContent('')
        .ok('Yes')
        .cancel('No');

      $mdDialog.show(confirm).then(function() {
        $cookies.remove('scheduleUser');
        $cookies.remove('token');
        $cookies.remove('authorities');
        $rootScope.currentUser = undefined;
        $state.go('calendarshell.filterpannel');
      }, function() {
        return;
      });
    }

  }
})();