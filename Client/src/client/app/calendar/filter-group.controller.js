(function() {
    'use strict';

    angular
        .module('app.calendar')
        .controller('FilterGroupController', FilterGroupController);

    FilterGroupController.$inject = ['$q', 'logger', '$scope', '$compile', 'uiCalendarConfig', 'groupservice'];
    /* @ngInject */
    function FilterGroupController($q, logger, $scope, $compile, uiCalendarConfig , groupservice) {
        var vm = this;
        vm.groups=[];
        vm.groupList=[
        ];
        vm.transformChip = transformChip;
        vm.selectedItem = null;
        vm.selectedGroups = [];
        vm.searchTextGroup = null;
        vm.querySearchGroup = querySearchGroup;
        vm.readonly = false;
        vm.numberChips = [];
        vm.numberChips2 = [];
        vm.numberBuffer = '';

        fetchAllGroups();


        /**
         * Return the proper object when the append is called.
         */
        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }
            // Otherwise, create a new one
            return { title: chip}
        }

        /**
         * Search for groups.
         */
        function querySearchGroup (query) {
            var results = query ? vm.groupList.filter(createFilterForGroup(query)) : vm.groupList;
            return results;
        }

        /**
         * Create filter function for a query string
         */
        function createFilterForGroup(query) {
            var lowercaseQuery = angular.lowercase(query);
            var groupListLC=groupListWithLovercase(vm.groupList)
            return function filterFn(groupListLC) {
                return (groupListLC._lowername.indexOf(lowercaseQuery) >= 0);

            };
        }

        function groupListWithLovercase(groupList){
            return groupList.map(function (group) {
                group._lowername = group.title.toLowerCase();
                return group;
            });
        }

        function fetchAllGroups(){
            var promises = [getGroups()];
            return $q.all(promises).then(function() {
                // logger.info('Activated Groups View');
            });
        }
        function getGroups() {
            return groupservice.getGroups().then(function(data) {
                vm.groups = data._embedded.iTAGroups;
                vm.groupList=vm.groups;
                return vm.groupList;
            });
        }

    }
})()