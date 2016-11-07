(function () {
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
            getUsersByRole: getUsersByRole,
            getUsersForPage: getUsersForPage,
            getUsersBySeachParam: getUsersBySeachParam,
            getTeachersForAnonymous:getTeachersForAnonymous
        };
        return service;

        function getUsers() {
            // $http.get('http://localhost:8080/users/search/findbyroles?roles='+role.toUpperCase())

            return $http.get('http://localhost:8080/users?projection=userslist')
                .then(success)
                .catch(fail);
            function success(response) {
                var users = response.data
                return users;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getUsers')(e);
            }
        }

        function getUsersByRole(role) {
            // $http.get('http://localhost:8080/users/search/findbyroles?roles='+role.toUpperCase())

            return $http.get('http://localhost:8080/users?projection=userslist')
                .then(success)
                .catch(fail);
            function success(response) {
                var users = response.data._embedded.users;
                return users.filter(function (user) {
                    return user.roles.some(function (r) {
                        return r === role.toUpperCase();
                    });
                });
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getUsers')(e);
            }
        }

        function getActiveTeachers() {
            // $http.get('http://localhost:8080/users/search/findbyroles?roles='+role.toUpperCase())
            return $http.get('http://localhost:8080/users?projection=shortinfo')
                .then(success)
                .catch(fail);
            function success(response) {
                var users = response.data._embedded.users;
                return users.filter(function (user) {
                    return user.active && user.roles.some(isTeacher);
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
            return $http.delete('http://localhost:8080/users/' + id)
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
                .then(success)
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
                url: 'http://localhost:8080/users/' + userToUpdate.id,
                data: userToUpdate,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "text/plain, application/json"
                }
            })
                .then(success)
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

        function getUsersForPage(pageNumber, pageSize, role, sortSirection, sortedField, active, search, callback) {
            $http({
                method: 'GET',
                url: 'http://localhost:8080/search-users-pages/' +
                '?page=' + pageNumber + '&size=' + pageSize + '&role=' + role.toUpperCase() +
                '&sortDirectionStr=' + sortSirection + '&sortedField=' + sortedField +
                '&active=' + active + '&search=' + search
            }).then(function (response) {
                var usersList = response.data.content;
                var pageInfo = response.data;
                callback(usersList, pageInfo);
            }, function (response) {
                logger.error('Unable to load users')
                /*+buildDefaultErrorMessage(response));*/
            });
        }

        function getUsersBySeachParam(searchParam, callback) {
            $http({
                method: 'GET',
                url: 'http://localhost:8080/search-users/?search=' + searchParam
            }).then(function (response) {
                var usersList = response.data;
                callback(usersList);
            }, function (response) {
                logger.error('Unable to load users')
                /*+buildDefaultErrorMessage(response));*/
            });
        }

        function getTeachersForAnonymous() {
            return $http.get('http://localhost:8080/users?projection=teacherAnonymous')
                .then(success)
                .catch(fail);
            function success(response) {
                var activeTeachers = [];
                response.data._embedded.users.forEach(function (teacher) {
                    if(teacher.active == true && teacher.roles.includes("TEACHER")){
                        activeTeachers.push({name:teacher.fullName,email:teacher.email});
                    }
                });
                return activeTeachers;
            }
            function fail(e) {
                return exception.catcher("can't to load rooms from data base")(e);
            }
        }
        /*      function buildDefaultErrorMessage(errorResponse){
         return '\nError: '+response.error+', \nstatus: '+response.status+', \nmessage: '+response.message;
         }

         function buildValidationErrorMessage(errors){
         var errorMessage = '';
         for(var i=0; i<errors.length; i++){
         errorMessage += '\n'+errors[i].field +': '+ errors[i].codes[3];
         }
         return errorMessage;
         }
         }*/
    }
})();