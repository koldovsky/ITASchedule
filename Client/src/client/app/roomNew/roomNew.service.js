(function() {
    'use strict';

    angular
        .module('app.roomNew')
        .factory('roomNewService', roomNewService);

    roomNewService.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */

    function roomNewService($http, $q, exception, logger) {
        var service = {
            getRoomNew: getRoomNew,
            createRoomNew: createRoomNew,
            updateRoomNew: updateRoomNew
        };
        return service;

        function getRoomNew() {
            return  $http.get('http://localhost:8080/rooms?projection=roomItem')
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(e) {
                return exception.catcher('XHR Failed for getRoomNew')(e);
            }
        }


        function createRoomNew(roomNewToAdd) {
            $http({
                method: 'POST',
                url: 'http://localhost:8080/rooms',
                data: roomNewToAdd,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "text/plain, application/json"
                }
            })
                .then (success)
                .catch(fail);
            function success(response) {
                console.log('Room created successfully');
                return response.data;
            }
            function fail(e) {
                console.log('Creating room - failed');
                return exception.catcher('XHR Failed for createRoom')(e);
            }
        }

        function updateRoomNew(roomNewToUpdate) {
            $http({
                method: 'PATCH',
                url: 'http://localhost:8080/rooms/'+roomNewToUpdate.id,
                data: roomNewToUpdate,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "text/plain, application/json"
                }
            })
                .then (success)
                .catch(fail);
            function success(response) {
                console.log('Room updated successfully');
                return response.data;
            }
            function fail(e) {
                console.log('Updating room - failed');
                return exception.catcher('Room not found!')(e);
            }
        }
    }
})();