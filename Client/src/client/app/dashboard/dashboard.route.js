(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'dashboard',
        config: {
          url: '/schedule',
          templateUrl: 'app/dashboard/dashboard.html',
          controller: 'CalendarShellController2',
          controllerAs: 'vm',
          title: 'dashboard',
          settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i> Calendar'
          },
          params:{
            teachers:[],
            rooms:[],
            groups:[]
          },
          authenticate: true,
          authorities: [
            'ROLE_ADMINISTRATOR', 'ROLE_TEACHER'
          ]
        }
      }
    ];
  }
})();
