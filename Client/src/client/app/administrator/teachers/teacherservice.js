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
                var deferred = $q.defer();
                $http({
                    method: 'DELETE',
                    url: '/teachers',
                    data: deletedMealIds,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then (success)
                    .catch(fail);
                function success(response) {
                    return deferred.resolve();
                }
                function fail(e) {
                    return exception.catcher('XHR Failed for getPeople')(e);
                    // return deferred.reject('Error deleting meals');
                }


                return deferred.promise;
            }

        function createTeacher(teacherToAdd) {
            $http({
                method: 'POST',
                url: 'http://localhost:8080/teachers',
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
    }
})();