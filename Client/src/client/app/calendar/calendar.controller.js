(function() {
    'use strict';

    angular
        .module('app.calendar')
        .controller('CalendarController', CalendarController);

    CalendarController.$inject = ['logger','$scope','$compile','uiCalendarConfig', '$q','eventService','$state' , '$mdDialog'];
    /* @ngInject */
    function CalendarController(logger,$scope,$compile,uiCalendarConfig, $q, eventService, $state, $mdDialog) {
        var vm = this;
        vm.title = 'Calendar';

        activate();

        function activate() {
            logger.info('Activated Calendar View');
        }

        /* modal window */
        $scope.showTabDialog = function (ev) {
            $mdDialog.show({
                templateUrl: 'app/event/add-event.html',
                controller: 'AddEventController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
        };

        /* fetching events from database */
        $scope.events=[];
        getEvents().then(function(result) {
            for (var i in result){
            $scope.events.push({title: result[i].title, start: result[i].startTime, end:result[i].endTime,  stick: true});}
        });

        function getEvents() {
            return eventService.getEvents().then(function(data) {
                vm.events = data._embedded.events;
                return vm.events;
            });
        }

        /* config object */
        $scope.uiConfig = {
            calendar:{
                height: 450,
                selectable:true,
                header:{
                    left: 'month agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                eventClick: function(event) {

                    alert('Event: ' + event.title);

                },
                select: function (start,end){
                    $scope.showTabDialog(event);
                },
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender
            }
        };

        /* event sources array*/
        $scope.eventSources = [$scope.events];

    }
})();
