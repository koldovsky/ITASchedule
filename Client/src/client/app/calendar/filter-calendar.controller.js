(function() {
    'use strict';

    angular
        .module('app.calendar')
        .controller('FilterCalendarController', FilterCalendarController);

    FilterCalendarController.$inject = ['$q', 'logger', '$scope', '$compile', 'uiCalendarConfig', 'teacherservice'];
    /* @ngInject */
    function FilterCalendarController($q, logger, $scope, $compile, uiCalendarConfig , teacherservice) {
        var vm = this;
        vm.teachers=[];
        vm.teacherList=[
            {name:'aaa',type:'bbbb'},
            {name:'ccc',type:'dddd'},

        ];

        vm.transformChip = transformChip;
        vm.selectedItem = null;
        vm.selectedTeachers = [];
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.vegetables = loadVegetables();

        vm.readonly = false;
        vm.selectedVegetables = [];
        vm.numberChips = [];
        vm.numberChips2 = [];
        vm.numberBuffer = '';
        vm.autocompleteDemoRequireMatch = true;
        vm.transformChip = transformChip;




        /**
         * Return the proper object when the append is called.
         */
        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }

            // Otherwise, create a new one
            return { name: chip, type: 'new' }
        }

        /**
         * Search for vegetables.
         */
        function querySearch (query) {
            var results = query ? vm.vegetables.filter(createFilterFor(query)) : [];
            return results;
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(vegetable) {
                return (vegetable._lowername.indexOf(lowercaseQuery) === 0) ||
                    (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
            };

        }

        function loadVegetables() {
            var veggies = [
                {
                    'name': 'Broccoli',
                    'type': 'Brassica'
                },
                {
                    'name': 'Cabbage',
                    'type': 'Brassica'
                },
                {
                    'name': 'Carrot',
                    'type': 'Umbelliferous'
                },
                {
                    'name': 'Lettuce',
                    'type': 'Composite'
                },
                {
                    'name': 'Spinach',
                    'type': 'Goosefoot'
                }
            ];

            return veggies.map(function (veg) {
                veg._lowername = veg.name.toLowerCase();
                veg._lowertype = veg.type.toLowerCase();
                return veg;
            });
        }



        fetchAllTeachers();


        function fetchAllTeachers(){
            var promises = [getTeachers()];
            return $q.all(promises).then(function() {
                logger.info('Activated Teachers View');
            });
        }
        function getTeachers() {
            return teacherservice.getTeachers().then(function(data) {
                vm.teachers = data._embedded.users;
                console.log("---------------teachers----------------");
                console.log('teachers: '+vm.teachers);
                vm.teacherList=vm.teachers;
                console.log('teacherList: '+vm.teacherList);
                return vm.teacherList;
            });
        }
    }
})()