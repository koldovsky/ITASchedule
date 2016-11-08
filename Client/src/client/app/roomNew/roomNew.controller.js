(function() {
    'use strict';

    angular
        .module('app.roomNew')
        .controller('roomNewListController', roomNewListController)
        .filter('unique',unique);

    roomNewListController.$inject = ['$q', 'roomNewService', 'logger', '$stateParams', '$state'];
    function roomNewListController($q, roomNewService, logger, $stateParams, $state) {
        var vm = this;
        vm.state=$state;
        vm.someObject = {};
        vm.roomNew={};
        vm.roomNew=$stateParams.roomNew;
        vm.roomNewList = [];
        vm.submit=submit;
        vm.create=create;
        vm.editRoomNew=editRoomNew;
        vm.showCalendar = showCalendar;
        vm.searchRoom ='';


        getRoomNew();
        
        function getRoomNew() {
            return roomNewService.getRoomNew().then(function(data) {
                vm.roomNewList = data._embedded.rooms;
                return vm.roomNewList;
            });
        }

        vm.createRoomNew = function() {
            $state.go('createRoomNew', {"roomNewObject": null});
        };
        vm.cancelCreation = function(){
            $state.go('listRoomNew');
        };

        /*vm.showCalendar = function($index){
            $state.go('calendar');
        }*/

        function showCalendar(room) {
            var roomForCalendar = {};
            roomForCalendar.name = ''+room.number+" ("+room.codeName+")";
            roomForCalendar.roomName = room.number;
            roomForCalendar.id = room.id;
            vm.state.go('dashboard',{'rooms':[roomForCalendar]});
        }

        function editRoomNew (roomNew) {
            $state.go('createRoomNew',{"roomNew": roomNew});

        }

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
            if (newRoomNew.id==null) {
                return roomNewService.createRoomNew(newRoomNew);
            }else{

            vm.someObject={
                "id" : newRoomNew.id,
                "number" : newRoomNew.number,
                "active" : newRoomNew.active
            };
                return roomNewService.updateRoomNew(vm.someObject);
            }
        }

    }
    //================filter=======================
    function unique() {
        return function (items, filterOn) {

            if (filterOn === false) {
                return items;
            }

            if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                var hashCheck = {}, newItems = [];

                var extractValueToCompare = function (item) {
                    if (angular.isObject(item) && angular.isString(filterOn)) {
                        return item[filterOn];
                    } else {
                        return item;
                    }
                };

                angular.forEach(items, function (item) {
                    var valueToCheck, isDuplicate = false;

                    for (var i = 0; i < newItems.length; i++) {
                        if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if (!isDuplicate) {
                        newItems.push(item);
                    }

                });
                items = newItems;
            }
            return items;
        };
        
    }

})();