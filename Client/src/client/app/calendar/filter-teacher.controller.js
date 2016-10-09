(function() {
    'use strict';

    angular
        .module('app.calendar')
        .controller('FilterTeacherController', FilterTeacherController);

    FilterTeacherController.$inject = ['$q', 'logger', '$scope', '$compile', 'uiCalendarConfig', 'teacherservice'];
    /* @ngInject */
    function FilterTeacherController($q, logger, $scope, $compile, uiCalendarConfig , teacherservice) {
        var vm = this;
        vm.teachers=[];
        vm.teacherList=[
        ];
        vm.transformChip = transformChip;
        vm.selectedItem = null;
        vm.selectedTeachers = [];
        vm.searchTextTeacher = null;
        vm.querySearchTeacher = querySearchTeacher;
        vm.readonly = false;
        vm.numberChips = [];
        vm.numberChips2 = [];
        vm.numberBuffer = '';

        fetchAllTeachers();


        /**
         * Return the proper object when the append is called.
         */
        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }
            // Otherwise, create a new one
            return { fullName: chip}
        }

        /**
         * Search for teachers.
         */
        function querySearchTeacher (query) {
            var results = query ? vm.teacherList.filter(createFilterForTeacher(query)) : vm.teacherList;
            return results;
        }

        /**
         * Create filter function for a query string
         */
        function createFilterForTeacher(query) {
            var lowercaseQuery = angular.lowercase(query);
            var teacherListLC=teacherListWithLovercase(vm.teacherList)
            return function filterFn(teacherListLC) {
                return (teacherListLC._lowername.indexOf(lowercaseQuery) === 0);

            };
        }

        function teacherListWithLovercase(teacherList){
            return teacherList.map(function (teacher) {
                teacher._lowername = teacher.fullName.toLowerCase();
                return teacher;
            });
        }

        function fetchAllTeachers(){
            var promises = [getTeachers()];
            return $q.all(promises).then(function() {
                // logger.info('Activated Teachers View');
            });
        }
        function getTeachers() {
            return teacherservice.getTeachers().then(function(data) {
                vm.teachers = data._embedded.users;
                vm.teacherList=vm.teachers;
                return vm.teacherList;
            });
        }

    }
})()