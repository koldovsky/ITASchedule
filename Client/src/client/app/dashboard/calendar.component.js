(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .component('calendarComp', {
            bindings: {
                rooms: '=rooms',
                teachers: '=teachers',
                groups: '=groups'
            },
            controller: calendarController,
            templateUrl: '/app/dashboard/calendar.html'
        });

    function calendarController(logger, $scope, $compile, uiCalendarConfig, $q, eventService, $state, $http, exception, $rootScope) {
        var vm = this;
        vm.title = 'Calendar';
        vm.state = $state;
        vm.filter = filter;
        vm.createEvent = createEvent;
        activate();

        function activate() {
            logger.info('Activated Calendar View');
        }
        function hoverIn(data, event, view) {
            var title = data.title;
            var startTime = moment(data.startTime).format('HH:mm');
            var endTime = moment(data.endTime).format('HH:mm');
            var groups = '';
            var type = data.eventType.type;
            var codeName = data.addressCodeName;
            var room = data.roomNumber;
            data.itagroups.forEach(function (group) {
                groups += ' ' + group.title;
            });
            var teachers = '';
            data.users.forEach(function (user) {
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
        /* fetching events from database */
        function getEvents() {
            return eventService.getEvents().then(function (data) {
                vm.events = data._embedded.events;
                return vm.events;
            });
        }
        function fillArray(array, result, iterator) {
            array.push({
                title: result[iterator].title,
                start: result[iterator].startTime,
                end: result[iterator].endTime,
                stick: true, eventType: result[iterator].eventType,
                itagroups: result[iterator].itagroups,
                users: result[iterator].users, cityName: result[iterator].cityName,
                addressCodeName: result[iterator].addressCodeName, roomNumber: result[iterator].roomNumber,
                id: result[iterator].id, startTime: result[iterator].startTime, endTime: result[iterator].endTime, color: result[iterator].eventType.color, date: result[iterator].startTime
            });
        }
        $scope.events = [];
        filter();
        $rootScope.$on('filter', function (event, params) {
            filter();
        });

        function filter() {
            while ($scope.events.length !== 0) {
                $scope.events.pop();
            }
            var filterArray = [];
            getEvents().then(function (result) {
                if (vm.rooms.length===0 && vm.teachers.length===0 && vm.groups.length===0){
                    for (var i in result) {fillArray(filterArray, result, i);}
                }
                for (var j in vm.rooms) {
                    for (var i in result) {
                        if (result[i].roomNumber === vm.rooms[j].roomName) {
                            fillArray(filterArray, result, i);
                        }
                    }
                }
                for (var j in vm.teachers) {
                    for (var i in result) {
                        for (var k in result[i].users) {
                            if (result[i].users[k].fullName === vm.teachers[j].name) {
                                fillArray(filterArray, result, i);
                            }
                        }
                    }
                }
                for (var j in vm.groups) {
                    for (var i in result) {
                        for (var k in result[i].itagroups) {
                            if (result[i].itagroups[k].title === vm.groups[j].name) {
                                fillArray(filterArray, result, i);
                            }
                        }
                    }
                }

                angular.forEach(filterArray, function (value) {
                    if (containsId($scope.events, value) === false) {
                        $scope.events.push(value)
                    }
                });
            });

        }
        function containsId (list, obj){
            for (var i = 0; i < list.length; i++) {
                if (list[i].id === obj.id) {
                    return true;
                }
            }

            return false;
        }
        function createEvent(){vm.state.go('editEvent', {"eventToEdit": null});}
        /* config object */
        $scope.uiConfig = {
            calendar: {
                header: {
                    left: 'month agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                displayEventTime: false,
                selectConstraint:{
                    start: '00:00',
                    end: '24:00'
                },
                timezone: 'local',
                selectable: true,
                eventMouseover: hoverIn,
                eventMouseout: hoverOut,
                eventClick: function (event) {

                    vm.state.go('editEvent', {"eventToEdit": event});

                },
                select: function(start,end, jsevent, view){
                    var event = {
                        title: null,
                        stick: true, eventType: null,
                        itagroups: [],
                        users: [], cityName: null,
                        addressCodeName: null, roomNumber: null,
                        startTime:  start, endTime:end, date: start
                    };
                    if(view.name==="month") {event.startTime=null, event.endTime=null, event.date=start}
                    vm.state.go('editEvent', {"eventToEdit": event});
                },
                eventRender: $scope.eventRender
            }
        };
        /* event sources array*/
        $scope.eventSources = [$scope.events];

    }
})()