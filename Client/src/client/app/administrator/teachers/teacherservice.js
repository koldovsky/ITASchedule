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
                addTeacher: addTeacher,
                deleteTeacher: deleteTeacher
            };
            return service;

            function getTeachers() {
                return  $http.get('http://localhost:8080/teachers?projection=brief')
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
                return  $http.delete('http://localhost:8080/teacher/'+id)
                    .then(success)
                    .catch(fail);
                function success(response) {
                    return response.data;
                }
                function fail(e) {
                    return exception.catcher('XHR Failed for getPeople')(e);
                }
            }

        function addTeacher(id) {
            return  $http.delete('http://localhost:8080/teacher/'+id)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            }
        }

    }
})();