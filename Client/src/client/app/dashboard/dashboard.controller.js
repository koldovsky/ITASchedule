(function() {
  'use strict';

  angular
      .module('app.dashboard')
      .controller('CalendarShellController', CalendarShellController);

  CalendarShellController.$inject = ['$q','userservice','groupservice','roomservice', '$state', '$stateParams', '$rootScope'];
  /* @ngInject */
  function CalendarShellController($q, userservice, groupservice, roomservice, $state, $stateParams, $rootScope) {
    var vm = this;
    // vm.myList=fetchAllTeachers();
    vm.myList = [];
    vm.result1 = [];
    vm.roomList = [];
    vm.groupList = [];
    vm.teacherList = [];
    vm.teacherSelected = $state.params.teachers;
    vm.roomSelected = $state.params.rooms;
    vm.groupSelected = $state.params.groups;
    vm.getRooms = getRooms;
    vm.getRooms = getTeachers;
    vm.getRooms = getGroups;
    vm.filter = filter;
    vm.clearFilter = clearFilter;
    vm.isFilter=isFilter;
    vm.nameRoom="Room";
    vm.nameTeacher="Teacher";
    vm.nameGroup="Group";

    fetchAll();
    filter();
    function fetchAll() {
      var promises = [getTeachers(), getGroups(), getRooms()];
      return $q.all(promises).then(function () {
      });
    }

    function getRooms() {
      return roomservice.getActiveRooms().then(function (data) {
        var rooms = data;
        var roomList = [];
        rooms.forEach(function (room) {
          var elem = {};
          elem.name = ''+room.number+" ("+room.codeName+")";
          elem.roomName = room.number;
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

    function filter() {
      $rootScope.$emit('filter', {id: 9876});
    }

    function clearFilter(){
      vm.teacherSelected=[];
      vm.roomSelected = [];
      vm.groupSelected = [];
      $rootScope.$emit('filter', {id: 9876});
    }
    
    function isFilter() {
        return (vm.teacherSelected.length==0)&(vm.groupSelected.length==0)&(vm.roomSelected.length==0);
    }

  }
})();