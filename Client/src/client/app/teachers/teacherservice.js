(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('teacherservice', teacherservice);

    teacherservice.$inject = ['$http', '$q', 'exception', 'logger'];
        /* @ngInject */

    function teacherservice($http, $q, exception, logger) {
            var service = {
                getTeachers: getTeachers,
                createTeacher: createTeacher,
                deleteTeacher: deleteTeacher,
                updateTeacher: updateTeacher
            };
            return service;

            function getTeachers() {
                return  $http.get('http://localhost:8080/users?projection=userslist')
                    .then(success)
                    .catch(fail);
                function success(response) {
                    console.log('getTeachers. success. response: '+response);
                    return response.data;
                }
                function fail(e) {
                    return exception.catcher('XHR Failed for getPeople')(e);
                }
            }

            function deleteTeacher(id) {
                return  $http.delete('http://localhost:8080/users/'+id)
                    .then(success)
                    .catch(fail);
                function success(response) {
                    return response.data;
                }
                function fail(e) {
                    return exception.catcher('XHR Failed for getPeople')(e);
                }
            }

        function createTeacher(teacherToAdd) {
            $http({
                method: 'POST',
                url: 'http://localhost:8080/users',
                data: teacherToAdd,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "text/plain, application/json"
                }
            })
                .then (success)
                .catch(fail);
            function success(response) {
                console.log('Teacher created successfully');
                return response.data;
            }
            function fail(e) {
                console.log('Creating teacher - fail');
                return exception.catcher('XHR Failed for getPeople')(e);
            }
        }

        function updateTeacher(teacherToUpdate) {
            $http({
                method: 'PATCH',
                url: 'http://localhost:8080/users/'+teacherToUpdate.id,
                data: teacherToUpdate,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "text/plain, application/json"
                }
            })
                .then (success)
                .catch(fail);
            function success(response) {
                console.log('Teacher updated successfully');
                return response.data;
            }
            function fail(e) {
                console.log('Updating teacher - fail');
                return exception.catcher('XHR Failed for getPeople')(e);
            }
        }
    }
})();