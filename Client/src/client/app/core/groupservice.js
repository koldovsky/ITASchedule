(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('groupservice', groupservice);

    groupservice.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */

    function groupservice($http, $q, exception, logger) {
        var service = {
            getGroups: getGroups,
            getActiveGroups: getActiveGroups,
            getGroupsForAnonymous:getGroupsForAnonymous
        };
        return service;

        function getGroups() {
            return  $http.get('http://localhost:8080/groups')
                .then(success)
                .catch(fail);
            function success(response) {
                console.log('getGroups. success. response: '+response);
                return response.data;
            }
            function fail(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            }
        }

        function getActiveGroups() {
            return  $http.get('http://localhost:8080/groups?projection=shortinfo')
                .then(success)
                .catch(fail);

            function success(response) {
                var groups=response.data._embedded.iTAGroups;
                console.log('getGroups. success. response: '+response);
                return groups.filter(function (group) {
                    return group.active;
                });
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            }
        }

        function getGroupsForAnonymous() {
            return $http.get('http://localhost:8080/groups?projection=groupAnonymous')
                .then(success)
                .catch(fail);
            function success(response) {
                var activeGroups = [];
                response.data._embedded.iTAGroups.forEach(function (group) {
                    if(group.active ==true){
                        activeGroups.push({name:group.title});
                    }
                });

                return activeGroups;
            }

            function fail(e) {
                return exception.catcher("can't to load rooms from data base")(e);
            }
        }
    }
})();