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
        getEvents();
        function getEvents() {
            return eventService.getEvents().then(function(data) {
                vm.events = data._embedded.events;
                return vm.events;
            });
        }

    }
})();