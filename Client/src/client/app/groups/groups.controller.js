/**
 * Created by marian on 04.10.16.
 */
(function() {
    'use strict';

    angular.module('app.groups')

        .controller('groupsListController',function($scope, logger, $http, $window,
                                                    $state, ITAGroupsService, $mdDialog, $location){
            var vm = this;

            //=================================== Initialization ===============================
            // array for storing groups, and map for storing groupId -> group_index_in_groupsList relation
            vm.groupsList = [];
            vm.groupsIdToArrayIndexMap = {};

            // pagination variables
            var search = $location.search();
            vm.pageInfo = search.page||0;
            vm.pageSizeOptions = [1,5,10,20,50,100,500,1000];
            vm.pageSize = 5;
            vm.paginationPanelNumbers = [];

            // tables content sorting and searching variables
            vm.sortByField = "title";
            vm.sortReverse = false;
            vm.searchGroupTitle = '';

            // functions
            vm.getGroupsForPage = getGroupsForPage;
            vm.showConfirmDeleteDialog = showConfirmDeleteDialog;
            vm.createGroup = createGroup;
            vm.editGroup = editGroup;
            vm.showCalendar = showCalendar;
            vm.refreshPaginationPanel = refreshPaginationPanel;

            //load list of groups for the first page
            getGroupsForPage(0,vm.pageSize);



            // ======================== Method downloading one page of groups ===================
            function getGroupsForPage(pageNumber,pageSize){
                ITAGroupsService.getGroupsPage(pageNumber, pageSize, function(groupsList, groupsIdToArrayIndexMap, pageInfo){
                    vm.groupsList = groupsList;
                    vm.groupsIdToArrayIndexMap = groupsIdToArrayIndexMap;
                    vm.pageInfo = pageInfo;
                })
            }

            // =================== Deleting group, parameter: position of the in groupsList ======
            function deleteGroup(index){
                    ITAGroupsService.deleteGroup(vm.groupsList[index].id, index, function(index){
                        vm.groupsList.splice(index,1);
                    });
            }

            // =============== Deleting group confirmation dialog, parameter: groupId =============
            function showConfirmDeleteDialog(id) {
                var index = vm.groupsIdToArrayIndexMap[id];
                var confirm = $mdDialog.confirm()
                    .title("Deleting group " + vm.groupsList[index].title)
                    .textContent('Would you like to delete group ' +vm.groupsList[index].title+'?')
                    .ok('Delete')
                    .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    deleteGroup(index);
                }, function() {
                    return false;
                });
            };

            // =============== Creating group, redirecting to create/edit group form =============
            function createGroup(){
                $state.go('createGroup',{"groupObject": null});
            }

            // =============== Editing group, redirecting to create/edit group form =============
            function editGroup(id){
                var index = vm.groupsIdToArrayIndexMap[id];
                $state.go('createGroup',{"groupObject": vm.groupsList[index]});
            }

            // =============== Redirecting to calendar of the group  ============================
            function showCalendar(id){
                $state.go('calendar');
            }

            // =============== Calculating pages and button titles for pagination panel ===========
            function refreshPaginationPanel(currentPage){
                var MAX_PAGES_COUNT = 3;
                var side = MAX_PAGES_COUNT%2;
                var minPage = 0;
                var maxPage = MAX_PAGES_COUNT;
                var totalPages = vm.pageInfo.totalPages;
                var input = [];
                if(currentPage<=MAX_PAGES_COUNT-side-1){
                    if(totalPages<MAX_PAGES_COUNT){
                        maxPage = totalPages;
                    }else{
                        maxPage = MAX_PAGES_COUNT;
                    }
                }else{
                    if(currentPage>(totalPages-side-1)){
                        maxPage = totalPages;
                        minPage = currentPage-(MAX_PAGES_COUNT-(totalPages-currentPage));
                    }else{
                        minPage = currentPage - side;
                        maxPage = currentPage + side+1;
                    }
                }
                for(var i=minPage; i<maxPage; i++) {
                    input.push(i);
                }
                return input;
            }

        });

})();
