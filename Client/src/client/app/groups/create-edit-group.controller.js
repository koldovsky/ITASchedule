/**
 * Created by marian on 04.10.16.
 */
(function() {
    'use strict';

    angular.module('app.groups')


        .controller('CreateGroupFormInstanceController', function(logger, $window, $http,
                                                                  $filter, $state, $stateParams,
                                                                  uibDateParser, ITAGroupsService,
                                                                  $mdDialog){
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
                    vm.addedTeachersList.push(vm.passedGroupObject.users[i]);
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
                url: 'http://localhost:8080/users?projection=shortinfo'
            }).then(function(response){
                var teachers = response.data._embedded.users;
                findTeacherDuplicatesInGroupTeacherList(teachers);
            }, function(response){
                logger.error("Unable to load list of available teachers from the server.");
            });

            function findTeacherDuplicatesInGroupTeacherList(teachers){
                for(var i=0; i<teachers.length; i++){
                    var teacherInTheList = false;
                    for(var j=0; j<vm.addedTeachersList.length; j++) {
                        if (vm.addedTeachersList[j].id == teachers[i].id){
                            teacherInTheList = true;
                            break;
                        }
                    }
                    if(!teacherInTheList) {
                        vm.allTeachers.push(teachers[i]);
                    }
                }
            }
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
            var successfullCreateOrUpdateCallback = function(isSuccessfull,errorMessage){
                if(isSuccessfull) {
                    $state.go('listGroups');
                }else{
                    showAlert("Group error",errorMessage);
                }
            }

            function showAlert(title,message) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title(title)
                        .textContent(message)
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                );
            };

            vm.instantiateNewObject = function(passedGroupObject){
                var newGroup = {
                    "title": vm.groupTitle,
                    "studentsCount": vm.studentsCount,
                    "startDate": $filter('date')(vm.startDate, 'yyyy-MM-dd'),
                    "endDate": $filter('date')(vm.endDate, 'yyyy-MM-dd'),
                    "active": vm.active,
                    "creatorId": 1,
                    "userIds": vm.addedTeachersList
                }
                var teacherIds = [];
                vm.addedTeachersList.forEach(function(teacher){
                    teacherIds.push(teacher.id);
                });
                newGroup["userIds"] = teacherIds;
                if(passedGroupObject!=null){
                    newGroup["id"] = passedGroupObject.id;
                }
                return newGroup;
            }
            vm.cancelCreation = function(){
                $state.go('listGroups');
            }

        });

})();
