(function() {
    'use strict';
    angular
        .module('app.event')
        .controller('EventController', EventController);

    EventController.$inject = ['$q','eventService','logger','$scope','$state'];
    function EventController($q, eventService, logger, $scope, $state) {
        var vm = this;

        vm.event={};
        vm.events=[];
        vm.state=$state;
        vm.editEvent=editEvent;
        getEvents();
        function getEvents() {
            return eventService.getEvents().then(function(data) {
                vm.events = data._embedded.events;
                return vm.events;
            });
        }
        function editEvent(event) {
            vm.state.go('addEvent',{'event': event});
        }

    }
})();