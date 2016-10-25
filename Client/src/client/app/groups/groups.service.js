/**
 * Created by marian on 06.10.16.
 */
(function() {
    'use strict';

    angular.module('app.groups')
        .factory('ITAGroupsService',function($http, $window, logger){

            var service = {
                getGroupsPage:getGroupsPage,
                getGroups: getGroups,
                deleteGroup: deleteGroup,
                createGroup: createGroup,
                updateGroup: updateGroup
            };
            return service;


            function getGroupsPage(pageNumber, pageSize, callback){
                $http({
                    method: 'GET',
                    url: 'http://localhost:8080/groupsPage?page='+pageNumber+'&size='+pageSize
                }).then(function (response) {
                    var groupsIdToArrayIndexMap = {};
                    var groupsList = response.data.content;
                    for(var i=0; i<groupsList.length; i++){
                        groupsIdToArrayIndexMap[groupsList[i].id] = i;
                    }
                    var page = response.data;
                    callback(groupsList, groupsIdToArrayIndexMap, page);
                }, function (response) {
                    logger.error('Unable to load groups'+buildDefaultErrorMessage(response));
                });
            }


            function getGroups(callback){
                $http({
                    method: 'GET',
                    url: 'http://localhost:8080/groups?projection=groupItem',
                }).then(function(response){
                    var groupsArray = response.data._embedded.iTAGroups;
                    var groupsList = [];
                    for(var i=0; i<groupsArray.length; i++){
                        groupsList.push(groupsArray[i]);
                    }
                    callback(groupsList);
                }, function(response){
                    logger.error('Unable to load groups.'+buildDefaultErrorMessage(response));
                    callback(response);
                });
            }

            function deleteGroup(id, index, callback){
                 $http({
                    url: 'http://localhost:8080/groups/'+id,
                    method: 'DELETE'
                }).then(function(response){
                     logger.info('The group has been successfully deleted!');
                     callback(index);
                }, function(response){
                     logger.error('Unable to delete the group.'+buildDefaultErrorMessage(response));
                });
            }

            function createGroup(group, callback){
                $http({
                    url: 'http://localhost:8080/writeGroup',
                    method: 'POST',
                    data: JSON.stringify(group),
                    headers: {'Content-Type':'application/json'}
                }).then(function(response){
                    logger.info('The group has been successfully created!');
                    callback(true);
                }, function(response){
                    callback(false,buildValidationErrorMessage(response.data));
                })
            }

            function buildDefaultErrorMessage(errorResponse){
                return '\nError: '+response.error+', \nstatus: '+response.status+', \nmessage: '+response.message;
            }

            function buildValidationErrorMessage(errors){
                var errorMessage = "";
                for(var i=0; i<errors.length; i++){
                    errorMessage += '\n'+errors[i].defaultMessage;
                }
                return errorMessage;
            }


            function updateGroup(updateGroup, callback){
                $http({
                    url: 'http://localhost:8080/writeGroup',
                    method: 'PUT',
                    data: JSON.stringify(updateGroup),
                    headers: {'Content-Type':'application/json'}
                }).then(function(response){
                    logger.info('The group has been successfully updated!');
                    callback(true);
                }, function(response){
                    callback(false,buildValidationErrorMessage(response.data));
                })
            }

    });

})();