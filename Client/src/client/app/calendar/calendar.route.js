(function() {
    'use strict';

    angular
        .module('app.calendar')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'calendarshell',
                config: {
                    url: '/calendarshell',
                    templateUrl: 'app/calendar/calendar-shell.html',
                    controller: 'CalendarShellController',
                    controllerAs: 'vm',
                    title: 'CalendarShell',
/*                    settings: {
                        nav: 8,
                        content: '<i class="fa fa-lock"></i> CalendarShell'
                    }*/
                }
            },
            {   state: 'calendarshell.filterpannel',
                config: {
                    url: '/calendar',
                    title: 'CalendarShell',
                    settings: {
                        nav: 15,
                        content: '<i class="fa fa-lock"></i> Calendar'
                    },
                    views: {
                        'filter-room': {
                            templateUrl: 'app/calendar/filter-room.html',
                            controller: 'FilterRoomController',
                            controllerAs: 'vm',
                            title: 'Filter-Room',
                        },
                        'filter-teacher': {
                            templateUrl: 'app/calendar/filter-teacher.html',
                            controller: 'FilterTeacherController',
                            controllerAs: 'vm',
                            title: 'Filter-Teacher',
                        },
                          'filter-group': {
                            templateUrl: 'app/calendar/filter-group.html',
                            controller: 'FilterGroupController',
                            controllerAs: 'vm',
                            title: 'Filter-Group',
                        },

                        'calendar': {
//                            url: '/calendar',
                            templateUrl: 'app/calendar/calendar.html',
                            controller: 'CalendarController',
                            controllerAs: 'vm',
                            title: 'Calendar',
                            settings: {
                                nav: 17,
                                content: '<i class="fa fa-lock"></i> filtredcalendar4'
                            }
                        }
                    }
                }
            }
        ];
    }
})();
