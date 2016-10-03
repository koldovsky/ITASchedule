(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('teacherservice', teacherservice);
    // .config(function($httpProvider) {
    //   $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    // });


    teacherservice.$inject = ['$http', '$q', 'exception', 'logger'];
        /* @ngInject */
    function teacherservice($http, $q, exception, logger) {
            var service = {
                getTeachers: getTeachers,
                createTeacher: createTeacher,
                deleteTeacher: deleteTeacher
            };
            return service;

            function getTeachers() {
                return  $http.get('http://localhost:8080/teachers?projection=editTeachers')
                    .then(success)
                    .catch(fail);
                function success(response) {
                    return response.data;
                }
                function fail(e) {
                    return exception.catcher('XHR Failed for getPeople')(e);
                }
            }

            function deleteTeacher(id) {
                return  $http.delete('http://localhost:8080/teachers/'+id)
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
                url: 'http://localhost:8080/teachers?projection=editTeachers',
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
                console.log('Sent:'+ !(teacherToAdd.isActive==="true"));
                console.log('Received:'+ response.isActive);
                return response.data;
            }
            function fail(e) {
                console.log('Creating teacher - fail');
                return exception.catcher('XHR Failed for getPeople')(e);
            }
        }
    }
})();