(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('roomservice', roomservice);

    roomservice.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */

    function roomservice($http, $q, exception, logger) {
        var service = {
            getRooms: getRooms,

        };
        return service;

        function getRooms() {
            return  $http.get('http://localhost:8080/rooms')
                .then(success)
                .catch(fail);
            function success(response) {
                console.log('getRooms. success. response: '+response);
                return response.data;
            }
            function fail(e) {
                return exception.catcher('XHR Failed for getRooms')(e);
            }
        }
    }
})();