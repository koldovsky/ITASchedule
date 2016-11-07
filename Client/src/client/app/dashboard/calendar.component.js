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
            controller: calendarController222,
            templateUrl: '/app/dashboard/calendar.html'
        });

    function calendarController222(logger, $scope, $compile, uiCalendarConfig, $q, eventService, $state, $http, exception, $rootScope) {
        var vm = this;
        vm.title = 'Calendar';
        vm.state = $state;
        vm.filter = filter;
        vm.createEvent = createEvent;
        activate();

        function activate() {
            logger.info('Activated Calendar View');
        }
        /* modal window */
        $scope.showTabDialog = function (ev) {

            vm.state.go('editEvent', {"eventToEdit": ev});
        };
        /* fetching events from database */
        $scope.events = [];
        filter();
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
                id: result[iterator].id, startTime: result[iterator].startTime, endTime: result[iterator].endTime
            });
        }

        $rootScope.$on('myCustoEvent', function (event, params) {
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
                        if (result[i].roomNumber === vm.rooms[j].name) {
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
                        if (result[i].roomNumber === vm.rooms[j].name) {
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
                defaultView: 'agendaWeek',
                displayEventTime: false,
                eventClick: function (event) {

                    vm.state.go('editEvent', {"eventToEdit": event});

                },
                dayClick: function (date) {
                    var event = {
                        title: null,
                        stick: true, eventType: null,
                        itagroups: [],
                        users: [], cityName: null,
                        addressCodeName: null, roomNumber: null,
                        startTime:  date, endTime:date
                    };
                    vm.state.go('editEvent', {"eventToEdit": event});

                },
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender
            }
        };

        /* event sources array*/
        $scope.eventSources = [$scope.events];

    }
})()