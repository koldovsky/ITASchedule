/**
 * Created by marian on 04.10.16.
 */
(function() {
    'use strict';

    angular.module('app.groups', [])


        .controller('CreateGroupFormInstanceController', function(logger, $window, $http, $filter, $state, $stateParams, uibDateParser, ITAGroupsService){
            //======================== General initialization ====================
            var vm = this;
            this.format = "yyyy-MM-dd";
            vm.addedTeachersList=[];
            vm.allTeachers = [];
            vm.active = true;
            //======================== Initialize form in Update mode ================
            vm.passedGroupObject = $stateParams.groupObject;
            if(vm.passedGroupObject!=null){
                vm.id = vm.passedGroupObject.id;
                vm.groupTitle = vm.passedGroupObject.title;
                vm.studentsCount = vm.passedGroupObject.studentsCount;
                vm.startDate = uibDateParser.parse(vm.passedGroupObject.startDate, this.format);
                vm.endDate = uibDateParser.parse(vm.passedGroupObject.endDate, this.format);
                vm.active =  vm.passedGroupObject.active;
                for(var i=0; i<vm.passedGroupObject.users.length; i++){
                    vm.addedTeachersList.push(vm.passedGroupObject.users[i].fullName);
                }
            }
            //======================== Initialize form in Create mode ================
            else{
                vm.id = null;
                vm.groupTitle = '';
                vm.studentsCount = 7;
                vm.startDate = new Date();
                vm.endDate = new Date();
                vm.active = true;
            }


            //======================== Initializing lists of teachers ==============================
            $http({
                method: 'GET',
                url: 'http://localhost:8080/users'
            }).then(function(response){
                var teachers = response.data._embedded.users;
                for(var i=0; i<teachers.length; i++){
                    /*var contains = false;
                    for(var teacher in vm.addedTeachersList){
                        if(teacher == teachers[i].fullName)
                            contains = true;
                    }*/
                    //if(!contains)
                    if(vm.addedTeachersList.indexOf(teachers[i].fullName)<0)
                        vm.allTeachers.push(teachers[i].fullName);
                }
            }, function(response){
                logger.error("Unable to load list of available teachers from the server.");
            });
            //====================== Students Number Controller ==========================
            vm.MAX_VALUE = 100;
            vm.MIN_VALUE = 1;

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
            vm.addTeacherToTheList = function(index){
                vm.addedTeachersList.push(vm.allTeachers[index]);
                vm.allTeachers.splice(index,1);
            }
            vm.removeTeacherFromTheList = function(index){
                vm.allTeachers.push(vm.addedTeachersList[index]);
                vm.addedTeachersList.splice(index,1);
            }
            //==================== From validation ========================
            vm.validateForm = function(){
                if(vm.addedTeachersList.length<1 ||
                    vm.groupTitle.length<1        ||
                    vm.endDate<vm.startDate       ||
                    vm.startDate<vm.currentDate){
                    logger.alert("Form is not complete!");
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
                if(isSuccessfull) {
                    $state.go('listGroups');
                }

            }
            vm.instantiateNewObject = function(passedGroupObject){
                $window.alert(vm.active);
                var newGroup = {
                    "title": vm.groupTitle,
                    "studentsCount": vm.studentsCount,
                    "startDate": $filter('date')(vm.startDate, 'yyyy-MM-dd'),
                    "endDate": $filter('date')(vm.endDate, 'yyyy-MM-dd'),
                    "active": vm.active,
                    "creatorFullName": "Hiroku Marian",
                    "usersFullNames": vm.addedTeachersList
                }
                if(passedGroupObject!=null){
                    newGroup["id"] = passedGroupObject.id;
                    logger.info("-----------"+passedGroupObject.id);
                    newGroup["creatorFullName"] = passedGroupObject.creatorFullName;
                }
                return newGroup;
            }
            vm.cancelCreation = function(){
                $state.go('listGroups');
            }

        });

})();
