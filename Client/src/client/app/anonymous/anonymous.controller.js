(function () {
    'use strict';

    angular
        .module('app.anonymous')
        .controller('AnonymousController', AnonymousController);
    AnonymousController.$inject = ['eventList', 'teacherList', 'groupList', 'roomList', 'addressList','$scope','$element'];

    /* @ngInject */

    function AnonymousController(eventList, teacherList, groupList, roomList, addressList,$scope,$element) {
        var vm = this;
        vm.calendarConfig = {
            header: {
                left: 'month agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            }
        };
        vm.calendarEvents = [];
        vm.events = eventList._embedded.events;
        vm.teachers = teacherList;
        vm.groups = groupList._embedded.iTAGroups;
        vm.rooms = roomList._embedded.rooms;
        vm.addressess = addressList._embedded.addresses;
        vm.calendarEvents = [];
console.log(vm.events);
        vm.convertEventsToCalendar = function (array) {
            var convertedArray = [];
            array.forEach(function (event) {
                convertedArray.push({title: event.title, start: event.startTime, end: event.endTime, stick: true, color:event.eventType.color})
            });
            return convertedArray;
        };
        vm.filterEventArrayBy = function(eventArray, filterObject){

        };
        $element.find('input').on('keydown', function(ev) {
            ev.stopPropagation();
        });
        vm.calendarEvents.push(vm.convertEventsToCalendar(vm.events));
    }


})();
