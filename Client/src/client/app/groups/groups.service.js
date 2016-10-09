/**
 * Created by marian on 06.10.16.
 */
(function() {
    'use strict';

    angular.module('app.groups')
        .factory('ITAGroupsService',function($http, $window){
        //http://stackoverflow.com/questions/18421830/how-to-wait-till-the-response-comes-from-the-http-request-in-angularjs

        return{


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
                    callback(response);
                });
            },

            deleteGroup: function(id, index, callback){
                 $http({
                    url: 'http://localhost:8080/groups/'+id,
                    method: 'DELETE'
                }).then(function(data,status,headers,config){
                    callback(index);
                }, function(response){
                     $window.alert("Unable to delete the object: "+response.error+", "+response.message);
                });
            },

            createGroup: function(newGroup, callback){
                $http({
                    url: 'http://localhost:8080/createGroup',
                    method: 'POST',
                    data: JSON.stringify(newGroup),
                    headers: {'Content-Type':'application/json'}
                }).success(function(data,status,headers,config){
                    $window.alert("User has been successfully created!");
                    callback(true);
                }).error(function(response){
                    $window.alert(response.error+", "+response.status+", "+response.message);
                    callback(false);
                })
            },

            updateGroup: function(updateGroup, callback){
                $http({
                    url: 'http://localhost:8080/updateGroup',
                    method: 'PUT',
                    data: JSON.stringify(updateGroup),
                    headers: {'Content-Type':'application/json'}

                }).success(function(data,status,headers,config){
                    $window.alert("Group has been successfully updated!");
                    callback(true);
                }).error(function(data,status,headers,config){
                    $window.alert(status);
                    callback(false);
                })
            }


        }

    });

})();