(function() {
  'use strict';

  angular
    .module('app.core', [
      'ngAnimate', 'ngSanitize',
      'blocks.exception', 'blocks.logger', 'blocks.router',
      'ui.router', 'ngplus', 'angular-oauth2'
    ])
    .run(function ($rootScope, $state, OAuth, loginservice, $cookies) {
      $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){


        if(loginservice.isAuthenticated() && $cookies.get('scheduleUser') )
        {
          $rootScope.currentUser = $cookies.get('scheduleUser');
          console.log('User: ' + $cookies.get('scheduleUser') + ' is in the system');
        }


        $rootScope.previousState = typeof fromState !== "undefined" && fromState !== null && fromState.name !== '' ? fromState.name : 'calendar';
        $rootScope.currentState = toState.name;

        if (toState.authenticate && typeof $rootScope.currentUser === 'undefined'){
          // User isn’t authenticated
          loginservice.login();
          event.preventDefault();
        }
      });
    });
})();
