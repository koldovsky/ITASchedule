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
        return userservice.getUsersByRole('TEACHER');
    }

    function rooms(eventService) {
        return eventService.getRooms();
    }

    function addressess(eventService) {
        return eventService.getAllAddresses();
    }
    function groups(groupservice) {
        return groupservice.getGroups();
    }

})();
