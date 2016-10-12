(function () {
    'use strict';
    angular
        .module('app.event', ['ngMaterial',
            'app.core',
            'app.groups',
            'app.widgets',
            'ngMessages',
            'mdPickers',
            'ngAria',
            'ui.bootstrap.timepicker'])
        .controller('AddEventController', AddEventController);

    AddEventController.$inject = ['$q', 'eventService', '$filter', 'logger', '$scope', '$state', '$mdDialog', 'teacherservice', 'ITAGroupsService'];
    function AddEventController($q, eventService, $filter, logger, $scope, $state, $mdDialog, teacherservice, ITAGroupsService) {
        var vm = this;
        vm.timePickerHourStep = 1;
        vm.timePickerMinuteStep = 30;
        $scope.ismeridian = false;
        vm.event = {};
        vm.teachers = [];
        vm.groups = [];
        vm.addedGroups = [];
        vm.addedTeachers = [];
        vm.addresses = [];
        vm.cities = [];
        vm.eventTypes = [];

        (function start() {
            var promises = [getTeachers(), getGroups(), getAddresses(), getTypes(), getCities(), getRooms()];
            return $q.all(promises).then(function () {
                logger.info('Connected to database');
            });
        })();
        function getTeachers() {
            return teacherservice.getTeachers().then(function (data) {
                vm.teachers = data._embedded.users;
                return vm.teachers;
            });
        }

        function getGroups() {
            ITAGroupsService.getITAGroups(function (response) {
                if (Object.prototype.toString.call(response) === '[object Array]') {
                    vm.groups = response;
                }
            });
        }

        function getAddresses() {
            return eventService.getAllAddresses().then(function (data) {
                vm.addresses = data._embedded.addresses;
                return vm.addresses;
            });
        }

        function getTypes() {
            return eventService.getEventTypes().then(function (data) {
                vm.eventTypes = data._embedded.eventTypes;
                return vm.eventTypes;
            });
        }

        function getCities() {
            return eventService.getCities().then(function (data) {
                vm.cities = data._embedded.cities;
                return vm.cities;
            });
        }

        function getRooms() {
            return eventService.getRooms().then(function (data) {
                vm.rooms = data._embedded.rooms;
                return vm.rooms;
            });
        }

        vm.addTeacher = function (teacher) {
            if (vm.addedTeachers.includes(teacher)) {
                vm.showAlert('You added already ' + teacher.fullName + " to the event");
            } else {
                vm.addedTeachers.push(teacher);
            }
        };
        vm.addGroup = function (group) {
            if (vm.addedGroups.includes(group)) {
                vm.showAlert('You added already ' + group.title + " to the event");
            } else {
                vm.addedGroups.push(group)
            }
        };
        vm.showAlert = function (text) {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .textContent(text)
                    .title('Warning')
                    .ok('Ok')
            );
        };
        vm.removeAddedTeacher = function (teacher) {
            var index = vm.addedTeachers.indexOf(teacher);
            if (index > -1) {
                vm.addedTeachers.splice(index, 1);
            }
        };
        vm.removeAddedGroup = function (group) {
            var index = vm.addedGroups.indexOf(group);
            if (index > -1) {
                vm.addedGroups.splice(index, 1);
            }
        };
        vm.isEventValid = function (event) {
            if (event.title && event.type && event.roomNumber && event.addressCodeName && event.startTime && event.endTime && vm.date && vm.startTime && vm.endTime && event.startTime && event.endTime) {
                if (event.teacherList[0] === null || event.groupList[0] === undefined) {
                    vm.showAlert('At least on teacher and group needs to be selected');
                    return false;
                } return true ;
            } else {
                vm.showAlert('One of the fields is not entered');
                return false;
            }
        };
        vm.createStartEndDate = function (date, time) {
            return $filter('date')(date, 'yyyy-MM-dd') + 'T' + ($filter('date')(time, 'HH:mm'));
        };
        vm.createStartEndDate = function (date, time) {
            return $filter('date')(date, 'yyyy-MM-dd') + 'T' + ($filter('date')(time, 'HH:mm'));
        };
        vm.builtEvent = function () {
            var event = {};
            event.title = vm.event.title;
            event.teacherList = vm.addedTeachers;
            event.creator = vm.addedTeachers[0];
            event.groupList = vm.addedGroups;
            event.type = vm.event.type.type;
            event.roomNumber = vm.room.number;
            event.addressCodeName = vm.address.codeName;
            event.startTime = vm.createStartEndDate(vm.date,vm.startTime);
            event.endTime = vm.createStartEndDate(vm.date,vm.endTime);
            return event;
         };
        vm.senEventOnServer = function () {
            if(vm.isEventValid(vm.builtEvent())){
                eventService.createEvent(vm.builtEvent())
            } else {
                logger.error('Event is not created!');
            }
        };

    }
})();