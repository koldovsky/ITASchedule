(function () {
    'use strict';

    angular
        .module('app.groups')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listGroups',
                config: {
                    url: '/listGroups',
                    templateUrl: 'app/groups/groups-list.html',
                    controller: 'groupsListController',
                    controllerAs: 'vm',
                    title: 'groupsList',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-group"></i> Groups'
                    },
                    authenticate: true,
                    authorities: [
                      'ROLE_ADMINISTRATOR', 'ROLE_TEACHER'
                    ]
                }
            },
            {
                state: 'createGroup',
                config: {
                    url: '/createGroup',
                    templateUrl: 'app/groups/create-edit-group-dialog.html',
                    controller: 'CreateGroupFormInstanceController',
                    controllerAs: 'vm',
                    title: 'groupsCreate',
                    params: {"groupObject": null}
                },
                authenticate: true,
                authorities: [
                    'ROLE_ADMINISTRATOR', 'ROLE_TEACHER'
                ]
            }];
    }
})();
