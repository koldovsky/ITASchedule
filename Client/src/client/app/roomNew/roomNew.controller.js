(function() {
    'use strict';

    angular
        .module('app.roomNew')
        .controller('roomNewListController', roomNewListController);

    roomNewListController.$inject = ['$q', 'roomNewService', 'logger', '$stateParams', '$state'];
    function roomNewListController($q, roomNewService, logger, $stateParams, $state) {
        var vm = this;
        vm.someObject = {};
        vm.roomNew={};
        vm.roomNew=$stateParams.roomNew;
        vm.roomNewList = [];
        vm.submit=submit;
        vm.create=create;
        vm.editRoomNew=editRoomNew;


        getRoomNew();
        
        function getRoomNew() {
            return roomNewService.getRoomNew().then(function(data) {
                vm.roomNewList = data._embedded.rooms;
                return vm.roomNewList;
            });
        }

        vm.createRoomNew = function() {
            $state.go('createRoomNew', {"roomNewObject": null});
        }
        vm.cancelCreation = function(){
            $state.go('listRoomNew');
        }
        vm.showCalendar = function($index){
            $state.go('calendar');
        }


        function editRoomNew (roomNew) {
            $state.go('createRoomNew',{"roomNew": roomNew});

        };

        function submit(){
            var promises = [create(vm.roomNew)];
            return $q.all(promises).then(function() {
                    logger.info('Good job!');
                }, function(){
                    logger.info('Can not update a room!');
                }
            );
        }

        function create(newRoomNew){
            // if (newRoomNew.id==null) {
            //     return roomNewService.createRoomNew(newRoomNew)
            // }else{

            vm.someObject={
                "id" : newRoomNew.id,
                "number" : newRoomNew.number,
                "isActive" : newRoomNew.isActive
            }
                return roomNewService.updateRoomNew(vm.someObject)
            // }
        }

    }
})();