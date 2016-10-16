(function() {
    'use strict';

    angular
        .module('app.calendar')
        .component('calendarFilterPanel', {
            bindings   : {
                elementList: '=list',
                selectedElements: '=result'
            },
            controller: filterPanelController,
            templateUrl: '/app/calendar/calendar-filter-panel.html'
        });


    function filterPanelController() {
        var vm = this;
        vm.elements=[];
        vm.transformChip = transformChip;
        vm.selectedItem = null;
        // vm.selectedElements = [];
        vm.searchTextElement = null;
        vm.querySearchElement = querySearchElement;
        vm.readonly = false;
        vm.numberChips = [];
        vm.numberChips2 = [];

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
         * Search for elements.
         */
        function querySearchElement (query) {
            return query ? vm.elementList.filter(createFilterForElement(query)) : vm.elementList;;
        }

        /**
         * Create filter function for a query string
         */
        function createFilterForElement(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function (elementList) {
                return (elementList.name.indexOf(lowercaseQuery) >= 0);

            };
        }

    }

})()