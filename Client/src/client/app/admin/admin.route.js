(function() {
  'use strict';

  angular
    .module('app.admin')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'admin',
        config: {
          url: '/listGroups',
          templateUrl: 'app/admin/dashboard-groups-list.html',
          controller: 'groupsListController',
          controllerAs: 'vm',
          title: 'groupsList',
          settings: {
            nav: 2,
            content: '<i class="fa fa-lock"></i> Admin'
          }
        }
      },
      {
        state: 'createGroup',
        config: {
          url: '/createGroup',
          templateUrl: 'app/admin/create-edit-group-dialog.html',
          controller: 'CreateGroupFormInstanceController',
          controllerAs: 'vm',
          title: 'groupsCreate',
        }
      }    ];
  }
})();
