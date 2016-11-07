(function () {
    'use strict';

    angular
        .module('app.anonymous')

        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'schedule',
                config: {
                    url: '/schedule',
                    templateUrl: 'app/anonymous/anonymous.html',
                    controller: 'AnonymousController',
                    controllerAs: 'vm',
                    resolve: {
                        eventList: events,
                        teacherList: teachers,
                        roomList: rooms,
                        addressList: addressess,
                        groupList : groups,
                        eventTypes:eventTypes

                    },
                    params: {
                        parasos: 'a'
                    },
                    settings: {
                        nav: 9,
                        content: '<i class="fa fa-calendar"></i> Anonymous'
                    }, authenticate: false
                }
            }];
    }

    function events(eventService) {
        return eventService.getEvents();
    }

    function teachers(userservice) {
        return userservice.getTeachersForAnonymous();
    }

    function rooms(eventService) {
        return eventService.getRoomsForAnonymous();
    }

    function addressess(eventService) {
        return eventService.getAddressesForAnonymous();
    }
    function groups(groupservice) {
        return groupservice.getGroupsForAnonymous();
    }
    function eventTypes(eventService) {
        return eventService.getEventTypes();
    }

})();
