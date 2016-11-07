(function() {
  'use strict';

  angular
    .module('app.core', [
      'ngAnimate', 'ngSanitize',
      'blocks.exception', 'blocks.logger', 'blocks.router',
      'ui.router', 'ngplus', 'angular-oauth2'
    ])
    .run(function ($rootScope, $state, OAuth, loginservice, $cookies, $mdDialog) {
      $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState){


        $rootScope.previousState = typeof fromState !== "undefined" && fromState !== null && fromState.name !== '' ? fromState.name : 'dashboard';
        $rootScope.currentState = toState.name;

        if(loginservice.isAuthenticated() )
        {
          if($rootScope.currentState === 'schedule') {
            event.preventDefault();
            $state.go('dashboard');
          }

          $rootScope.currentUser = loginservice.getUserFromToken($cookies.get('token'));
          console.log('User: ' + $rootScope.currentUser.userName + ' is in the system');
        }

        if (toState.authenticate) {

          if (typeof $rootScope.currentUser === 'undefined') {
            // User isn’t authenticated
            loginservice.login();
            event.preventDefault();
          } else
          if( toState.authorities.filter(function(authority) {
              return $rootScope.currentUser.authorities.indexOf(authority) > -1;
            }).length === 0) {
            //User isn't authorized
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .textContent('Access denied!')
                .title('Warning')
                .ok('Ok')
            );
            $state.go($rootScope.previousState);
            event.preventDefault();
          }
        }
        //Authentication isn't needed

      });

      $rootScope.$on('oauth:error', function(event, rejection) {
        // Ignore `invalid_grant` error - should be catched on `LoginController`.
        if ('invalid_grant' === rejection.data.error) {
          return;
        }

        // Refresh token when a `invalid_token` error occurs.
        if ('invalid_token' === rejection.data.error) {
          OAuth.getRefreshToken()
            .then(function() {
              loginservice.setTokenExpiry();
              $state.reload();
            })
            .catch(function(error) {
              console.log('error', error);
            });

        }

        // Redirect to calendar with the `error_reason`.
        return function() {
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .textContent(rejection.data.error)
              .title('Warning')
              .ok('Ok')
          );
          loginservice.cleanCookies();
          $state.go('schedule');
        }
      });
    });
})();
