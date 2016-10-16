(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('userservice', userservice);

    userservice.$inject = ['$http', '$q', 'exception', 'logger'];
        /* @ngInject */

    function userservice($http, $q, exception, logger) {
            var service = {
                getUsers: getUsers,
                createUser: createUser,
                deleteUser: deleteUser,
                updateUser: updateUser,
                getActiveTeachers: getActiveTeachers,
                getUsersByRole: getUsersByRole
            };
            return service;

            function getUsers() {
                // $http.get('http://localhost:8080/users/search/findbyroles?roles='+role.toUpperCase())

                return  $http.get('http://localhost:8080/users?projection=userslist')
                    .then(success)
                    .catch(fail);
                function success(response) {
                    var users=response.data
                    return users;
                }
                function fail(e) {
                    return exception.catcher('XHR Failed for getUsers')(e);
                }
            }

            function getUsersByRole(role) {
                // $http.get('http://localhost:8080/users/search/findbyroles?roles='+role.toUpperCase())

                return  $http.get('http://localhost:8080/users?projection=userslist')
                    .then(success)
                    .catch(fail);
                function success(response) {
                    var users=response.data._embedded.users;
                    return users.filter(function (user) {
                        return user.roles.some(isTeacher);
                    });
                }
                function fail(e) {
                    return exception.catcher('XHR Failed for getUsers')(e);
                }
            }
            function getActiveTeachers() {
                // $http.get('http://localhost:8080/users/search/findbyroles?roles='+role.toUpperCase())
                return  $http.get('http://localhost:8080/users?projection=shortinfo')
                    .then(success)
                    .catch(fail);
                function success(response) {
                    var users=response.data._embedded.users;
                    return users.filter(function (user) {
                        return user.active&&user.roles.some(isTeacher);
                            });

                    }
                function fail(e) {
                    return exception.catcher('XHR Failed for getUsers')(e);
                }
            }

            function isTeacher(role) {
                var answ = (role == "TEACHER");
                return answ;
            }

            function deleteUser(id) {
                return  $http.delete('http://localhost:8080/users/'+id)
                    .then(success)
                    .catch(fail);
                function success(response) {
                    return response.data;
                }
                function fail(e) {
                    return exception.catcher('XHR Failed for deleteUser')(e);
                }
            }

        function createUser(userToAdd) {
            $http({
                method: 'POST',
                url: 'http://localhost:8080/users',
                data: userToAdd,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "text/plain, application/json"
                }
            })
                .then (success)
                .catch(fail);
            function success(response) {
                console.log('User created successfully');
                return response.data;
            }
            function fail(e) {
                console.log('Creating user - fail');
                return exception.catcher('XHR Failed for createUser')(e);
            }
        }

        function updateUser(userToUpdate) {
            $http({
                method: 'PATCH',
                url: 'http://localhost:8080/users/'+userToUpdate.id,
                data: userToUpdate,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "text/plain, application/json"
                }
            })
                .then (success)
                .catch(fail);
            function success(response) {
                console.log('User updated successfully');
                return response.data;
            }
            function fail(e) {
                console.log('Updating user - fail');
                return exception.catcher('User not found!')(e);
            }
        }
    }
})();