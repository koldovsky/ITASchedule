(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('eventService', eventService);

    eventService.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */

    function eventService($http, $q, exception, logger) {
        var service = {
            getEvents: getEvents,
            getAllAddresses: getAllAddresses,
            getEventTypes: getEventTypes,
            getCities: getCities,
            getRooms: getRooms,
            createEvent:createEvent
        };
        return service;
        function getEvents() {
            return $http.get('http://localhost:8080/events?projection=detailed')
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher("can't to load events from data base")(e);
            }
        }

        function getAllAddresses() {
            return $http.get('http://localhost:8080/locations?projection=detailed')
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher("can't to load addressess from data base")(e);
            }
        }

        function getEventTypes() {
            return $http.get('http://localhost:8080/eventtypes')
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher("can't to load event types from data base")(e);
            }
        }

        function getCities() {
            return $http.get('http://localhost:8080/cities')
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher("can't to load event types from data base")(e);
            }
        }

        function getRooms() {
            return $http.get('http://localhost:8080/rooms?projection=detailed')
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher("can't to load rooms from data base")(e);
            }
        }

        function createEvent(event) {
            $http({
                url: 'http://localhost:8080/createEvent',
                method: 'POST',
                data: JSON.stringify(event),
                headers: {'Content-Type': 'application/json'}
            }).success(function () {
                logger.info("Event Created");
            }).error(function (response) {
                var errorMessgage = "";
                response.forEach(function (item) {
                    errorMessgage = errorMessgage + item.codes;
                });
                logger.error("Unable to create new event, error:" + errorMessgage);
            })
        }
    }
})();