(function() {
    'use strict';

    angular
        .module('app.calendar')
        .controller('FilterRoomController', FilterRoomController);

    FilterRoomController.$inject = ['$q', 'logger', '$scope', '$compile', 'uiCalendarConfig', 'roomservice'];
    /* @ngInject */
    function FilterRoomController($q, logger, $scope, $compile, uiCalendarConfig , roomservice) {
        var vm = this;
        vm.rooms=[];
        vm.roomList=[
        ];
        vm.transformChip = transformChip;
        vm.selectedItem = null;
        vm.selectedRooms = [];
        vm.searchTextRoom = null;
        vm.querySearchRoom = querySearchRoom;
        vm.readonly = false;
        vm.numberChips = [];
        vm.numberChips2 = [];
        vm.numberBuffer = '';

        fetchAllRooms();


        /**
         * Return the proper object when the append is called.
         */
        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }
            // Otherwise, create a new one
            return { number: chip}
        }

        /**
         * Search for rooms.
         */
        function querySearchRoom (query) {
            var results = query ? vm.roomList.filter(createFilterForRoom(query)) : vm.roomList;
            return results;
        }

        /**
         * Create filter function for a query string
         */
        function createFilterForRoom(query) {
            var lowercaseQuery = angular.lowercase(query);
            var roomListLC=roomListWithLovercase(vm.roomList)
            return function filterFn(roomListLC) {
                return (roomListLC._lowername.indexOf(lowercaseQuery) >= 0);

            };
        }

        function roomListWithLovercase(roomList){
            return roomList.map(function (room) {
                room._lowername = room.number.toLowerCase();
                return room;
            });
        }

        function fetchAllRooms(){
            var promises = [getRooms()];
            return $q.all(promises).then(function() {
                // logger.info('Activated Rooms View');
            });
        }
        function getRooms() {
            return roomservice.getRooms().then(function(data) {
                vm.rooms = data._embedded.rooms;
                vm.roomList=vm.rooms;
                return vm.roomList;
            });
        }

    }
})()