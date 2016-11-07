(function () {
    'use strict';

    angular
        .module('app.event')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'event',
                config: {
                    url: '/event',
                    templateUrl: 'app/event/event.html',
                    controller: 'EventController',
                    controllerAs: 'vm',
                    title: 'event',
                    authenticate: true,
                    authorities: [
                        'ROLE_ADMINISTRATOR', 'ROLE_TEACHER'
                    ]
                }
            },
            {
                state: 'addEvent',
                config: {
                    url: '/add-event',
                    templateUrl: 'app/event/create-edit-event.html',
                    controller: 'AddEventController',
                    controllerAs: 'vm',
                    title: 'addEvent',
                    authenticate: true,
                    authorities: [
                        'ROLE_ADMINISTRATOR', 'ROLE_TEACHER'
                    ]
                }
            },
            {
                state: 'editEvent',
                config: {
                    url: '/edit-event',
                    templateUrl: 'app/event/create-edit-event.html',
                    controller: 'AddEventController',
                    controllerAs: 'vm',
                    title: 'editEvent',
                    params: {"eventToEdit": null},
                    authenticate: true,
                    authorities: [
                        'ROLE_ADMINISTRATOR', 'ROLE_TEACHER'
                    ]
                }
            }];
    }
})();
