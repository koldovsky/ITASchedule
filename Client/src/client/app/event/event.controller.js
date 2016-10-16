(function() {
    'use strict';
    angular
        .module('app.event')
        .controller('EventController', EventController);

    EventController.$inject = ['$q','eventService','logger','$scope','$state'];
    function EventController($q, eventService, logger, $scope, $state) {
        var vm = this;

        vm.event = {};
        vm.events = [];
        vm.state = $state;

        getEvents();
        function getEvents() {
            return eventService.getEvents().then(function (data) {
                vm.events = data._embedded.events;
                return vm.events;
            });
        }
        vm.editEvent = function (event) {
            vm.state.go('editEvent',{"eventToEdit": event});
        }

    }
})();