(function () {
    'use strict';

    angular
        .module('app.anonymous')
        .controller('AnonymousController', AnonymousController);
    AnonymousController.$inject = ['eventList', 'eventTypes', '$mdDialog', 'teacherList', 'groupList', 'logger', 'roomList', 'addressList', '$scope', '$element'];

    /* @ngInject */

    function AnonymousController(eventList, eventTypes, $mdDialog, teacherList, groupList, logger, roomList, addressList, $scope, $element) {

        var vm = this;
        vm.calendarConfig = {
            //  defaultView: 'agendaWeek',
            header: {
                left: 'month agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            timeFormat: 'HH:mm',

            eventMouseover: hoverIn,
            eventMouseout: hoverOut

        };
        vm.calendarEvents = [];
        vm.demos = [];
        vm.eventTypes = eventTypes._embedded.eventTypes;
        vm.events = eventList._embedded.events;
        vm.teachers = teacherList;
        vm.groups = groupList;
        vm.rooms = roomList;
        vm.addresses = addressList;
        vm.addedTeachers = [];
        vm.filteredRooms = [];
        vm.addedRooms = [];
        vm.arr = vm.teachers;
        vm.addedGroups = [];
        vm.events.forEach(function (event) {
            var today = new Date();
            if (event.eventType.type == "demo" && new Date(event.startTime) > today) {
                var demo = event;
                demo.date = moment(event.startTime).format("DD/MM   /YYYY");
                demo.time = moment(event.startTime).format("HH:mm");
                vm.demos.push(demo);
            }
        });
        $element.find('input').on('keydown', function (ev) {
            ev.stopPropagation();
        });
        function hoverIn(data, event, view) {
            var title = data.title;
            var startTime = moment(data.eventInfo.startTime).format('HH:mm');
            var endTime = moment(data.eventInfo.endTime).format('HH:mm');
            var groups = '';
            var type = data.eventInfo.eventType.type;
            var codeName = data.eventInfo.addressCodeName;
            var room = data.eventInfo.roomNumber;
            data.eventInfo.itagroups.forEach(function (group) {
                groups += ' ' + group.title;
            });
            var teachers = '';
            data.eventInfo.users.forEach(function (user) {
                teachers += ' ' + user.fullName;
            });
            var template = '<div class="tooltiptopicevent hover-box">' +
                '<p class="text-center">' + title + '<br>' + ' ' + codeName + ' in ' + room +
                '<br>' + startTime + ' - ' + endTime + '<br></p>'
                + 'group :' + groups + '<br> teacher :' + teachers + '</div>';

            $("body").append(template);
            $(this).mouseover(function (e) {
                $(this).css('z-index', 10000);
                $('.tooltiptopicevent').fadeIn('500');
                $('.tooltiptopicevent').fadeTo('10', 1.9);
            }).mousemove(function (e) {
                $('.tooltiptopicevent').css('top', e.pageY + 10);
                $('.tooltiptopicevent').css('left', e.pageX + 20);
            });


        }
        function hoverOut(data, event, view) {
            $(this).css('z-index', 8);

            $('.tooltiptopicevent').remove();

        }
        vm.convertEventsToCalendar = function (array) {
            var convertedArray = [];
            array.forEach(function (event) {
                convertedArray.push({
                    title: event.title,
                    start: event.startTime,
                    end: event.endTime,
                    stick: true,
                    color: event.eventType.color,
                    eventInfo: event
                })
            });
            return convertedArray;
        };
        vm.calendarEvents.push(vm.convertEventsToCalendar(vm.events));
        vm.refreshFilters = function () {
            vm.codeName = '';
            vm.addedGroups.length = 0;
            vm.addedTeachers.length = 0;
            vm.addedRooms.length = 0;
        };
        vm.objectsAddedForSearch = function () {
            if (!(vm.addedTeachers[0] || vm.addedGroups[0] || vm.addedRooms[0])) {
                return true
            }
        };
        vm.clearSearchTerm = function () {
            vm.searchTerm = '';
        };
        vm.filterRoomsByCodeName = function (codeName) {
            vm.filteredRooms.length = 0;
            vm.addedRooms.length = 0;
            vm.rooms.forEach(function (room) {
                if (room.addressCodeName == codeName) {
                    vm.filteredRooms.push(room);
                }
            });
        };
        vm.filterEventsByRoom = function (roomsArray) {
            var filteredEvents = [];
            vm.events.forEach(function (event) {
                roomsArray.forEach(function (room) {
                    if (event.addressCodeName == room.addressCodeName && event.roomNumber == room.name) {
                        filteredEvents.push(event);
                    }
                })
            });
            return filteredEvents;
        };
        vm.filterEventsByTeachers = function (teacherArray) {
            var filteredEvents = [];
            vm.events.forEach(function (event) {
                teacherArray.forEach(function (teacher) {
                    if (vm.teacherNameFilter(event, teacher)) {
                        filteredEvents.push(event);
                    }
                })
            });
            return filteredEvents;
        };
        vm.filterEventsByGroups = function (roomArray) {
            var filteredEvents = [];
            vm.events.forEach(function (event) {
                roomArray.forEach(function (room) {
                    if (vm.groupTitleFilter(event, room)) {
                        filteredEvents.push(event);
                    }
                })
            });
            return filteredEvents;
        };
        vm.teacherNameFilter = function (event, addedTeacher) {
            var teacherNames = [];
            event.users.forEach(function (teacher) {
                teacherNames.push(teacher.fullName);
            });
            return teacherNames.includes(addedTeacher.name);
        };
        vm.groupTitleFilter = function (event, addedGroup) {
            var groupTitles = [];
            event.itagroups.forEach(function (group) {
                groupTitles.push(group.title);
            });
            return groupTitles.includes(addedGroup.name);
        };
        vm.refreshCalendar = function () {
            vm.calendarEvents.length = 0;
            if (vm.filter == 'address') {
                vm.calendarEvents.push(vm.convertEventsToCalendar(vm.filterEventsByRoom(vm.addedRooms)));
            }
            if (vm.filter == 'group') {
                vm.calendarEvents.push(vm.convertEventsToCalendar(vm.filterEventsByGroups(vm.addedGroups)));
            }
            if (vm.filter == 'teacher') {
                var arr = vm.convertEventsToCalendar(vm.filterEventsByTeachers(vm.addedTeachers));
                vm.calendarEvents.push(vm.removeDuplicates(arr));
            }


        };
        vm.removeDuplicates = function (arr) {
            var newArr = [];
            angular.forEach(arr, function (value, key) {
                var exists = false;
                angular.forEach(newArr, function (val2, key) {
                    if (angular.equals(value, val2)) {
                        exists = true
                    }
                });
                if (exists == false && value != "") {
                    newArr.push(value);
                }
            });
            return newArr;
        };
        vm.clearFilter = function () {
            vm.calendarEvents.length = 0;
            vm.calendarEvents.push(vm.convertEventsToCalendar(vm.events));
        }



    }


})();
