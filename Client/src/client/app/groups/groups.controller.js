/**
 * Created by marian on 04.10.16.
 */
(function() {
    'use strict';

    angular.module('app.groups', [])

        .controller('groupsListController',function($http, $window, $state, ITAGroupsService){
            var vm = this;
            vm.groupsList = [];

            ITAGroupsService.getITAGroups(function(response){
                if(Object.prototype.toString.call(response) === '[object Array]'){
                    vm.groupsList = response;
                }else{
                    $window.alert(response.error+", "+response.status+", "+response.message);
                }
            });
            vm.deleteGroup = function (index){
                ITAGroupsService.deleteGroup(vm.groupsList[index].id, index, function(index){
                    vm.groupsList.splice(index,1);
                });
            }

            vm.createGroup = function(){
                $state.go('createGroup',{"groupObject": null});
            }
            vm.editGroup = function(index){
                if(index>=0 && index<(vm.groupsList.length)){
                    $state.go('createGroup',{"groupObject": vm.groupsList[index]});
                }

            }
        })
        .controller('CreateGroupFormInstanceController', function($window, $http, $filter, $state, $stateParams, uibDateParser, ITAGroupsService){
            //======================== General initialization ====================
            var vm = this;
            this.format = "yyyy-MM-dd";

            vm.addedTeachersList=[];
            vm.allTeachers = [];
            //======================== Initialize form in Update mode ================
            vm.passedGroupObject = $stateParams.groupObject;
            if(vm.passedGroupObject!=null){
                vm.groupTitle = vm.passedGroupObject.title;
                vm.studentsCount = vm.passedGroupObject.studentsCount;
                vm.startDate = uibDateParser.parse(vm.passedGroupObject.startDate, this.format);
                vm.endDate = uibDateParser.parse(vm.passedGroupObject.endDate, this.format);
                for(var i=0; i<vm.passedGroupObject.users.length; i++){
                    vm.addedTeachersList.push(vm.passedGroupObject.users[i].fullName);
                }
            }
            //======================== Initialize form in Create mode ================
            else{
                vm.groupTitle = '';
                vm.studentsCount = 7;
                vm.startDate = new Date();
                vm.endDate = new Date();
            }
            //======================== Initializing lists of teachers ==============================
            $http({
                method: 'GET',
                url: 'http://localhost:8080/users'
            }).then(function(response){
                var teachers = response.data._embedded.users;
                for(var i=0; i<teachers.length; i++){
                    vm.allTeachers.push(teachers[i].fullName);
                }
                vm.selectedTeacher = vm.allTeachers[0];
            }, function(response){
                //$window.alert('Can not download the list of users: '+response.status);
            });

            //====================== Students Number Controller ==========================
            vm.MAX_VALUE = 100;
            vm.MIN_VALUE = 1;

            vm.incrementValue = function(){
                if(vm.studentsCount<vm.MAX_VALUE){
                    vm.studentsCount += 1;
                }
            }
            vm.decrementValue = function(){
                if(vm.studentsCount>vm.MIN_VALUE){
                    vm.studentsCount -= 1;
                }
            }
            //=======================Date pickers Controller ==============================

            vm.currentDate = new Date();
            vm.startPicker = {
                opened: false,
            }
            vm.endPicker = {
                opened: false
            }
            vm.popupStartPicker = function(){
                vm.startPicker.opened=true;
            }
            vm.popupEndPicker = function(){
                vm.endPicker.opened=true;
            }
            //===================== Teachers List Controller ==============================
            vm.selectedTeacher = null;
            vm.addTeacherToTheList = function(){
                if (vm.addedTeachersList.indexOf(vm.selectedTeacher)>-1){
                    return;
                }
                vm.addedTeachersList.push(vm.selectedTeacher);
            }
            vm.removeTeacherFromTheList = function(index){
                vm.addedTeachersList.splice(index,1);
            }
            //==================== From validation ========================
            vm.validateForm = function(){
                if(vm.addedTeachersList.length<1 ||
                    vm.groupTitle.length<1        ||
                    vm.endDate<vm.startDate       ||
                    vm.startDate<vm.currentDate){
                    $window.alert("Form is not complete!");
                    return false;
                }
                return true;
            }



            //==================== Create/Update Buttons ========================
            vm.createGroup = function(){
                var newGroup = vm.instantiateNewObject(null);
                ITAGroupsService.createGroup(newGroup, successfullCreateOrUpdateCallback);
            }
            vm.updateGroup = function(){
                if(vm.passedGroupObject==null) {
                    return;
                }
                var updateGroup = vm.instantiateNewObject(vm.passedGroupObject);
                ITAGroupsService.updateGroup(updateGroup, successfullCreateOrUpdateCallback);
            }
            var successfullCreateOrUpdateCallback = function(isSuccessfull){
                if(isSuccessfull)
                    $state.go('listGroups');
            }
            vm.instantiateNewObject = function(passedGroupObject){
                var newGroup = {
                    "title": vm.groupTitle,
                    "studentsCount": vm.studentsCount,
                    "startDate": $filter('date')(vm.startDate, 'yyyy-MM-dd'),
                    "endDate": $filter('date')(vm.endDate, 'yyyy-MM-dd'),
                    "isActive": true,
                    "creatorFullName": "Hiroku Marian",
                    "usersFullNames": vm.addedTeachersList
                }
                if(passedGroupObject!=null){
                    newGroup["id"] = passedGroupObject.id;
                    newGroup["creatorFullName"] = passedGroupObject.creator.fullName
                }
                return newGroup;
            }

        });

})();
