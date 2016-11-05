(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$state', 'routerHelper', '$mdDialog', '$scope', 'loginservice', '$rootScope'];
  /* @ngInject */
  function SidebarController($state, routerHelper, $mdDialog, $scope, loginservice, $rootScope) {
    var vm = this;
    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;
    vm.authenticatedUser = authenticatedUser;
    vm.showLogin = loginservice.login;
    vm.logout = loginservice.logout;
    vm.allowedRoutes = configureNavRoutes;

    activate();

    function activate() { getNavRoutes(); }

    function getNavRoutes() {
      vm.navRoutes = states.filter(function(r) {
        return r.settings && r.settings.nav;
      }).sort(function(r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

    function isCurrent(route) {
      if (!route.title || !$state.current || !$state.current.title) {
        return '';
      }
      var menuName = route.title;
      return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
    }

    function authenticatedUser() {
      var userName = $rootScope.currentUser ? $rootScope.currentUser.userName : undefined;
      return userName;
    }

    function configureNavRoutes() {
        var allowedRoutes = [];
        vm.navRoutes.forEach(function(state) {
        var userAuthorities = $rootScope.currentUser ? $rootScope.currentUser.authorities : [];
        var stateAuthorities = state.authorities ? state.authorities : [];
        if(state.authenticate) {
          if (stateAuthorities.filter(function (authority) {
            return userAuthorities.indexOf(authority) > -1;
          }).length == userAuthorities.length && userAuthorities.length > 0) {
            allowedRoutes.push(state);
          }
         /* if(stateAuthorities.includes(userAuthorities)) {
            allowedRoutes.push(state);
          }*/
        } else
        {
          allowedRoutes.push(state);
        }
      });
      return allowedRoutes;
   }

  }
})();
