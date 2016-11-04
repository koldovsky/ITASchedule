(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .component('calendarComp', {
            bindings   : {
                rooms: '=rooms',
                teachers: '=teachers',
                groups: '=groups',
            },
            controller: calendarController222,
            templateUrl: '/app/dashboard/calendar.html'
        });

    function calendarController222(logger,$scope,$compile,uiCalendarConfig, $q, eventService, $state) {
        var vm = this;
        vm.title = 'Calendar';
        vm.state = $state;
        vm.filter = filter;
        activate();
        function activate() {
            logger.info('Activated Calendar View');
        }

        /* modal window */
        $scope.showTabDialog = function (ev) {

            vm.state.go('editEvent',{"eventToEdit": ev});
        };

        /* fetching events from database */
        $scope.events=[];
        getEvents().then(function(result) {
            for (var i in result){
                $scope.events.push({title: result[i].title,
                    start: result[i].startTime,
                    end:result[i].endTime,
                    stick: true, eventType:result[i].eventType,
                    itagroups:result[i].itagroups,
                    users:result[i].users, cityName:result[i].cityName,
                    addressCodeName:result[i].addressCodeName, roomNumber:result[i].roomNumber,
                    id:result[i].id, startTime:result[i].startTime, endTime:result[i].endTime });}
            for (var i in $scope.events) {
                for (var j in $scope.events[i].itagroups)
            {console.log($scope.events[i].itagroups[j].title)}}
        });

        function getEvents() {
            return eventService.getEvents().then(function(data) {
                vm.events = data._embedded.events;
                return vm.events;
            });
        }


        function filter() {
            while ($scope.events.length !== 0) {
                $scope.events.pop();
            }
            getEvents().then(function(result) {
                for (var j in vm.rooms){
                for (var i in result){
                    if (result[i].roomNumber === vm.rooms[j].name){
                        $scope.events.push({title: result[i].title,
                            start: result[i].startTime,
                            end:result[i].endTime,
                            stick: true, eventType:result[i].eventType,
                            itagroups:result[i].itagroups,
                            users:result[i].users, cityName:result[i].cityName,
                            addressCodeName:result[i].addressCodeName, roomNumber:result[i].roomNumber,
                            id:result[i].id, startTime:result[i].startTime, endTime:result[i].endTime });}}}
                for (var j in vm.teachers){
                    for (var i in result){
                        for (var k in result[i].users)

                    {
                        if (result[i].users[k].fullName === vm.teachers[j].name){
                            $scope.events.push({title: result[i].title,
                                start: result[i].startTime,
                                end:result[i].endTime,
                                stick: true, eventType:result[i].eventType,
                                itagroups:result[i].itagroups,
                                users:result[i].users, cityName:result[i].cityName,
                                addressCodeName:result[i].addressCodeName, roomNumber:result[i].roomNumber,
                                id:result[i].id, startTime:result[i].startTime, endTime:result[i].endTime });}}}}
                for (var j in vm.groups){
                    for (var i in result){
                        for (var k in result[i].itagroups)

                        {
                            if (result[i].itagroups[k].title === vm.groups[j].name){
                                $scope.events.push({title: result[i].title,
                                    start: result[i].startTime,
                                    end:result[i].endTime,
                                    stick: true, eventType:result[i].eventType,
                                    itagroups:result[i].itagroups,
                                    users:result[i].users, cityName:result[i].cityName,
                                    addressCodeName:result[i].addressCodeName, roomNumber:result[i].roomNumber,
                                    id:result[i].id, startTime:result[i].startTime, endTime:result[i].endTime });}}}}

                for (var i in $scope.events) {console.log("id= "+$scope.events[i].id);}
                for (var i=$scope.events.length-1; i>=0; i--){console.log("i= "+i);
                    for (j=i-1; j>=0; j--){console.log("j= "+j);if($scope.events[j].id===$scope.events[i].id){
                        $scope.events.splice(j,1);
                    }}
                }

            });
        }
        /* config object */
        $scope.uiConfig = {
            calendar:{
                header:{
                    left: 'month agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                eventClick: function(event) {

                    $scope.showTabDialog(event);

                },
                dayClick: function (date){
                    console.log(vm.rooms[0].name);
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