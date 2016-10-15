(function() {
    'use strict';

    angular
        .module('app.calendar')
        .controller('CalendarShellController', CalendarShellController);

    CalendarShellController.$inject = ['logger', '$scope', '$compile', 'uiCalendarConfig'];
    /* @ngInject */
    function CalendarShellController(logger, $scope, $compile, uiCalendarConfig) {
        var vm = this;
    }
})()