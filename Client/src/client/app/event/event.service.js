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
            createEvent: createEvent,
            editEvent: editEvent,
            getAddressesForAnonymous: getAddressesForAnonymous,
            getRoomsForAnonymous:getRoomsForAnonymous
        };
        return service;

        function getEvents() {
            return $http.get('http://localhost:8080/events?size=1000&?projection=detailed')
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

        function editEvent(event) {
            $http({
                url: 'http://localhost:8080/createEvent',
                method: 'PUT',
                data: JSON.stringify(event),
                headers: {'Content-Type': 'application/json'}
            }).success(function () {
                logger.info("Event Edited");
            }).error(function (response) {
                var errorMessgage = "";
                response.forEach(function (item) {
                    errorMessgage = errorMessgage + item.codes;
                });
                logger.error("Unable to create new event, error:" + errorMessgage);
            })
        }

        function getAddressesForAnonymous() {
            return $http.get('http://localhost:8080/locations?projection=addressAnonymous')
                .then(success)
                .catch(fail);
            function success(response) {
                var activeAddresses = [];
                response.data._embedded.addresses.forEach(function (address) {
                    if (address.active == true) {
                        activeAddresses.push(address);
                    }
                });

                return activeAddresses;
            }

            function fail(e) {
                return exception.catcher("can't to load rooms from data base")(e);
            }
        }

        function getRoomsForAnonymous() {
            return $http.get('http://localhost:8080/rooms?projection=roomAnonymous')
                .then(success)
                .catch(fail);
            function success(response) {
                var activeRooms = [];
                response.data._embedded.rooms.forEach(function (room) {
                    if (room.active == true && room.addressActive == true) {
                        activeRooms.push({name:room.number,addressCodeName:room.addressCodeName});
                    }
                });

                return activeRooms;
            }

            function fail(e) {
                return exception.catcher("can't to load rooms from data base")(e);
            }
        }


    }
})();