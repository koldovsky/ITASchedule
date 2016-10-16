(function() {
    'use strict';

    angular
        .module('app.calendar')
        .controller('calendarFilterPanelController', calendarFilterPanelController);

    calendarFilterPanelController.$inject = [];
    /* @ngInject */
    function calendarFilterPanelController() {
        var $ctrl = this;
        $ctrl.elements=[];
        // $ctrl.elementList=[];
        $ctrl.transformChip = transformChip;
        $ctrl.selectedItem = null;
        $ctrl.selectedElements = [];
        $ctrl.searchTextElement = null;
        $ctrl.querySearchElement = querySearchElement;
        $ctrl.readonly = false;
        $ctrl.numberChips = [];
        $ctrl.numberChips2 = [];

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
            var results = query ? $ctrl.elementList.filter(createFilterForElement(query)) : $ctrl.elementList;
            return results;
        }

        /**
         * Create filter function for a query string
         */
        function createFilterForElement(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(elementList) {
                return (elementList.name.indexOf(lowercaseQuery) >= 0);

            };
        }

        function elementListWithLovercase(elementList){
            return elementList.map(function (element) {
                element._lowername = element.title.toLowerCase();
                return element;
            });
        }
    }
})()