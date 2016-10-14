(function() {
    'use strict';

    angular
        .module('app.administrator.users')
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
                    templateUrl: 'app/users/user.html',
                    controller: 'usersController',
                    controllerAs: 'vm',
                    title: 'teachers',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-users"></i> Teachers'
                    },
                    params:{
                        roleName:"Teacher"
                    }
                }
            },
            {
                state: 'addTeacher',
                config: {
                    url: '/add-teacher',
                    templateUrl: 'app/users/add-user.html',
                    controller: 'addUsersController',
                    controllerAs: 'vm',
                    title: 'addUsers',
                    params :
                    {
                        user: null,
                        roleName:"Teacher"
                    }
                }
            },
            {
                state: 'administrators',
                config: {
                    url: '/administrators',
                    templateUrl: 'app/users/user.html',
                    controller: 'usersController',
                    controllerAs: 'vm',
                    title: 'administrators',
                    settings: {
                        nav: 6,
                        content: '<i class="fa fa-user"></i>Administrators'
                    },
                    params:{
                        roleName:"Administrator"
                    }
                }
            },
            {
                state: 'addAdministrator',
                config: {
                    url: '/add-administrators',
                    templateUrl: 'app/users/add-user.html',
                    controller: 'addUsersController',
                    controllerAs: 'vm',
                    title: 'addAdministrators',
                    params :
                    {
                        user: null,
                        roleName: "Administrator"
                    }
                }
            }

        ];
    }
})();
