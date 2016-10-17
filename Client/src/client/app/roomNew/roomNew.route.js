(function () {
    'use strict';

    angular
        .module('app.roomNew')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listRoomNew',
                config: {
                    url: '/listRoomNew',
                    templateUrl: 'app/roomNew/roomNew-list.html',
                    controller: 'roomNewListController',
                    controllerAs: 'vm',
                    title: 'roomNewList',
                    settings: {
                        nav: 7,
                        content: '<i class="fa fa-map-marker"></i> Rooms'
                    }
                }
            },
            {
                state: 'createRoomNew',
                config: {
                    url: '/createRoomNew',
                    templateUrl: 'app/roomNew/create-edit-roomNew.html',
                    controller: 'roomNewListController',
                    controllerAs: 'vm',
                    title: 'roomNewCreate',
                    params: {roomNew: null},
                    /*settings: {
                        nav: null,
                        content: '<i class="fa fa-university"></i> Create RoomNew'
                    }*/
                }
            }];
    }
})();
