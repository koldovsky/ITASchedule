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

    AddEventController.$inject = ['$q', 'eventService', '$stateParams', '$filter', 'logger', '$scope', '$state', '$mdDialog', 'userservice', 'ITAGroupsService'];
    function AddEventController($q, eventService, $stateParams, $filter, logger, $scope, $state, $mdDialog, userservice, ITAGroupsService) {
        var vm = this;
        vm.timePickerHourStep = 1;
        vm.timePickerMinuteStep = 30;
        vm.eventToEdit = $stateParams.eventToEdit;
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
            return userservice.getUsers().then(function (data) {
                var teachers = data._embedded.users;
                teachers.forEach(function (teacher) {
                    var teacher = {fullName: teacher.fullName, email: teacher.email};
                    vm.teachers.push(teacher);
                });
                return vm.teachers;
            });
        }

        function getGroups() {
            ITAGroupsService.getGroups(function (response) {
                if (Object.prototype.toString.call(response) === '[object Array]') {
                    var groups = response;
                    groups.forEach(function (group) {
                        vm.groups.push(group.title);
                    });
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


        if (!(vm.eventToEdit == null)) {
            vm.event.title = vm.eventToEdit.title;
            vm.eventToEdit.itagroups.forEach(function (itaGroup) {
                vm.addedGroups.push(itaGroup.title)
            });
            vm.eventToEdit.users.forEach(function (user) {
                var teacher = {fullName: user.fullName, email: user.email};
                vm.addedTeachers.push(teacher);
            });
            vm.event.type = vm.eventToEdit.eventType;
            vm.date = new Date(vm.eventToEdit.startTime);
            vm.startTime = new Date(vm.eventToEdit.startTime);
            vm.endTime = new Date(vm.eventToEdit.endTime);
            vm.city = vm.eventToEdit.cityName;
            vm.codeName = vm.eventToEdit.addressCodeName;
            vm.roomNumber = vm.eventToEdit.roomNumber;
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
                vm.showAlert('You added already ' + group + " to the event");
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
            if (vm.event.type && event.title && event.type && event.roomNumber && event.addressCodeName && event.startTime && event.endTime && vm.date && vm.startTime && vm.endTime && event.startTime && event.endTime) {
                if (vm.addedTeachers[0]===undefined ) {
                    vm.showAlert('At least one teacher needs to be selected');
                    return false;
                }
                return true;
            } else {
                vm.showAlert('One of the fields is not entered');
                return false;
            }
        };
        vm.createStartEndDate = function (date, time) {
            return $filter('date')(date, 'yyyy-MM-dd') + 'T' + ($filter('date')(time, 'HH:mm'));
        };
        vm.builtEvent = function () {
            var event = {};
            if (!(vm.eventToEdit == null)) {
                event.id = vm.eventToEdit.id;
            }
            event.title = vm.event.title;
            event.userEmails = [];
            vm.addedTeachers.forEach(function (teacher) {
                event.userEmails.push(teacher.email);
            });
            //add here creator after full validation is created
            event.creatorEmail = 'konon@gmail.com';
            event.groupTitles = vm.addedGroups;
            if (vm.event.type) {
                event.type = vm.event.type.type;
            } else vm.showAlert('select event type ');
            event.roomNumber = vm.roomNumber;
            event.addressCodeName = vm.addressCodeName;
            event.startTime = vm.createStartEndDate(vm.date, vm.startTime);
            event.endTime = vm.createStartEndDate(vm.date, vm.endTime);
            return event;
        };
        vm.sendEventOnServer = function () {
            if (vm.isEventValid(vm.builtEvent())) {
                eventService.createEvent(vm.builtEvent());
                $mdDialog.hide();
            } else {
                logger.error('Event is not created!');
            }
        };
        vm.sendEditedEventOnServer = function () {
            if (vm.isEventValid(vm.builtEvent())) {
                eventService.editEvent(vm.builtEvent());
                $mdDialog.hide();
            } else {
                logger.error('Event is not created!');
            }
        };
        vm.hideModal = function () {
            $mdDialog.hide();
        };

    }
})();