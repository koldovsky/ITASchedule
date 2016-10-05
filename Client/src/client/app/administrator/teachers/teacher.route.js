(function() {
    'use strict';

    angular
        .module('app.administrator.teachers')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'teachers',
                config: {
                    url: '/teacher',
                    templateUrl: 'app/administrator/teachers/teacher.html',
                    controller: 'teachersController',
                    controllerAs: 'vm',
                    title: 'teachers',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-user-secret"></i> Teachers'
                    },
                    params:{
                        roleName:"SuperTeacher"
                    }
                }
            },
            {
                state: 'addTeacher',
                config: {
                    url: '/add-teacher',
                    templateUrl: 'app/administrator/teachers/add-teacher.html',
                    controller: 'addTeachersController',
                    controllerAs: 'vm',
                    title: 'addTeachers',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-user-secret"></i> Add Teacher'
                    },
                    params : { teacher: null},
                }
            }

        ];
    }
})();
