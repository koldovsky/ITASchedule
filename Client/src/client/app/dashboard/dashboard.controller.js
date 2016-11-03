(function() {
  'use strict';

  angular
      .module('app.dashboard')
      .controller('CalendarShellController2', CalendarShellController2);

  CalendarShellController2.$inject = ['$q','userservice','groupservice','roomservice', '$state', '$stateParams'];
  /* @ngInject */
  function CalendarShellController2($q, userservice, groupservice, roomservice, $state, $stateParams) {
    var vm = this;
    // vm.myList=fetchAllTeachers();
    vm.myList = [];
    vm.result1 = [];
    vm.roomList = [];
    vm.groupList = [];
    vm.teacherList = [];
    vm.teacherSelected = [];
    vm.roomSelected = [];
    vm.groupSelected = [];
    vm.getRooms = getRooms;
    vm.getRooms = getTeachers;
    vm.getRooms = getGroups;

    fetchAll();

    function fetchAll() {
      var promises = [getTeachers(), getGroups(), getRooms()];
      return $q.all(promises).then(function () {
        // logger.info('Activated Rooms View');
      });
    }

    function getRooms() {
      return roomservice.getActiveRooms().then(function (data) {
        var rooms = data;
        var roomList = [];
        rooms.forEach(function (room) {
          var elem = {};
          elem.name = ''+room.number;
          elem.id = room.id;
          roomList.push(elem);
        });
        vm.roomList=roomList;
        return roomList;
      });
    }

    function getGroups() {
      return groupservice.getActiveGroups().then(function (data) {
        var groups = data;
        var groupList = [];
        groups.forEach(function (group) {
          var elem = {};
          elem.name = group.title;
          elem.id = group.id;
          groupList.push(elem);
        });
        vm.groupList=groupList;
        return groupList;
      });
    }


    function getTeachers() {
      return userservice.getActiveTeachers().then(function (users) {
        var teacherList = [];
        users.forEach(function (user) {
          var elem = {};
          elem.name = user.fullName;
          elem.id = user.id;
          teacherList.push(elem);
        });
        vm.teacherList=teacherList;
        vm.myList =teacherList;
        return teacherList;
      });
    }
  }
})()