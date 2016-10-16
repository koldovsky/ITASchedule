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
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-wheelchair-alt "></i>Events'
                    },authenticate: false
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
                    authenticate: false
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
                    authenticate: false
                }
            }];
    }
})();
