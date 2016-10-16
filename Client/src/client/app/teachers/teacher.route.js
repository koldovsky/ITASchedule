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
                    templateUrl: 'app/teachers/teacher.html',
                    controller: 'teachersController',
                    controllerAs: 'vm',
                    title: 'teachers',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-users"></i> Teachers'
                    },
                    params:{
                        roleName:"Teacher"
                    },
                    authenticate: true
                }
            },
            {
                state: 'addTeacher',
                config: {
                    url: '/add-teacher',
                    templateUrl: 'app/teachers/add-teacher.html',
                    controller: 'addTeachersController',
                    controllerAs: 'vm',
                    title: 'addTeachers',
                    params :
                    {
                        teacher: null,
                        roleName:"Teacher"
                    },
                    authenticate: true
                }
            },
            {
                state: 'administrators',
                config: {
                    url: '/administrators',
                    templateUrl: 'app/teachers/teacher.html',
                    controller: 'teachersController',
                    controllerAs: 'vm',
                    title: 'administrators',
                    settings: {
                        nav: 6,
                        content: '<i class="fa fa-user"></i>Administrators'
                    },
                    params:{
                        roleName:"Administrator"
                    },
                    authenticate: false
                }
            },
            {
                state: 'addAdministrator',
                config: {
                    url: '/add-administrators',
                    templateUrl: 'app/teachers/add-teacher.html',
                    controller: 'addTeachersController',
                    controllerAs: 'vm',
                    title: 'addAdministrators',
                    params :
                    {
                        teacher: null,
                        roleName: "Administrator"
                    },
                    authenticate: false
                }
            }

        ];
    }
})();
