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
                    authenticate: false
/*                    settings: {
                        nav: 8,
                        content: '<i class="fa fa-lock"></i> CalendarShell'
                    }*/
                }
            },
            {   state: 'calendarshell.filterpannel',
                config: {
                    url: '/calendar',
                    title: 'Calendar',
                    settings: {
                        nav: 8,
                        content: '<i class="fa fa-lock"></i> Calendar'
                    },
                    params:{
                        teachers:[],
                        rooms:[],
                        groups:[]
                    },
                    views: {
                        'calendar': {
                            templateUrl: 'app/calendar/calendar.html',
                            controller: 'CalendarController',
                            controllerAs: 'vm',
                            title: 'Calendar',
                            settings: {
                                nav: 8,
                                content: '<i class="fa fa-lock"></i> filtredcalendar'
                            },

                            authenticate: false
                        }
                    },
                    authenticate: false
                }
            }
        ];
    }
})();
