/**
 * Created by marian on 06.10.16.
 */
(function() {
    'use strict';

    angular.module('app.groups')
        .factory('ITAGroupsService',function($http, $window, logger){
        //http://stackoverflow.com/questions/18421830/how-to-wait-till-the-response-comes-from-the-http-request-in-angularjs

        return{

            getITAGroupsPage: function(page, callback){
                $http({
                    method: "GET",
                    url: 'http://localhost:8080/groupsPage?page='+page+'&size=3'
                }).then(function (response) {

                    //================= Parsing groups ==================

                    var groupsList = [];
                    var groupsIdToArrayIndexMap = {};
                    var groupsArray = response.data.content;
                    for(var i=0; i<groupsArray.length; i++){
                        groupsList.push(groupsArray[i]);
                        groupsIdToArrayIndexMap[groupsArray[i].id] = i;
                    }

                    //================= Parsing page ====================
                    var page = response.data;


                    callback(groupsList, groupsIdToArrayIndexMap, page);

                }, function (response) {
                    logger.error("CANT RECEIVE PAGES");
                });
            },


            getITAGroups: function(callback){
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
                    logger.error("Unable to load list of groups, error:"+response.error+", status:"+response.status+", message:"+response.message);
                    callback(response);
                });
            },

            deleteGroup: function(id, index, callback){
                 $http({
                    url: 'http://localhost:8080/groups/'+id,
                    method: 'DELETE'
                }).then(function(response){
                     logger.info("The group has been successfully deleted!");
                    callback(index);
                }, function(response){
                     logger.error("Unable to delete the group, error:"+response.error+", status:"+response.status+", message:"+response.message);
                });
            },

            createGroup: function(newGroup, callback){
                $http({
                    url: 'http://localhost:8080/writeGroup',
                    method: 'POST',
                    data: JSON.stringify(newGroup),
                    headers: {'Content-Type':'application/json'}
                }).then(function(response){
                    logger.info("User has been successfully created!");
                    callback(true);
                }, function(response){
                    var errors = response.data;
                    var errorMessage = 'Unable to create new group:\n';
                    for(var i=0; i<errors.length; i++ ){
                        errorMessage += (i+1)+') '+errors[i].rejectedValue +': '+ errors[i].codes[3]+'\n';
                    }
                    logger.error(errorMessage);
                    callback(false);
                })
            },

            updateGroup: function(updateGroup, callback){
                $http({
                    url: 'http://localhost:8080/writeGroup',
                    method: 'PUT',
                    data: JSON.stringify(updateGroup),
                    headers: {'Content-Type':'application/json'}

                }).then(function(response){
                    logger.info("Group has been successfully updated!");
                    callback(true);
                }, function(response){
                    var errors = response.data;
                    var errorMessage = 'Unable to create new group:\n';
                    for(var i=0; i<errors.length; i++ ){
                        errorMessage += (i+1)+') '+errors[i].rejectedValue +': '+ errors[i].codes[3]+'\n';
                    }
                    logger.error(errorMessage);
                    callback(false);
                })
            }


        }

    });

})();