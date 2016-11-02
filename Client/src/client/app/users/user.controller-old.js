(function() {
'use strict';
    angular
        .module('app.administrator.users')
        .controller('usersControllerOld', usersControllerOld);

    usersControllerOld.$inject = ['$q', 'userservice', 'logger','$scope', '$state','$location'];
    function usersControllerOld($q, userservice, logger, $scope, $state, $location){
        var vm = this;
        vm.roleName=$state.params.roleName;
        vm.isTeacher=(vm.roleName=='Teacher');
        vm.user={};
        vm.users=[];
        vm.displayedUsers=[];
        vm.state=$state;
        vm.isUser=isUser;
        vm.editUser=editUser;
        vm.calendar=calendar;
        vm.userSearch="";
        vm.callServer = callServer;
        vm.isLoading = true;

        var search = $location.search();
        vm.pageInfo = search.page||0;
        vm.pageSizeOptions = [3,5,10,20,100];
        vm.pageSize = 5;
        vm.paginationPanelNumbers = [];
        vm.sortedField = "fullName";
        vm.sortDirection="Asc";
        vm.SearchMode=false;
        vm.onlyActive=false;

        function isUser(currentUser) {
            var role;
            var roles=currentUser.roles
            var len = roles.length;
            var i;
            for (i=0; i<len; i++) {
                if (i in roles) {
                    role = roles[i];
                    if (role == vm.roleName.toUpperCase()) {
                        return true;
                    }
                }
            }
            return false;
        }


        function editUser (user ) {
            vm.state.go('add'+vm.roleName,{'user': user});
    }

        function calendar (user ) {
            var userForCalendar={};
            userForCalendar.name=user.fullName;
            userForCalendar.id=user.id;
            vm.state.go('calendarshell.filterpannel',{'teachers': [userForCalendar]});
        }

        function callServer(tableState){

            vm.isLoading = true;

            var pagination = tableState.pagination;

            var pageSize = pagination.number || 3;  // Number of entries showed per page.
            var pageNumber = ~~(pagination.start/pageSize) || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            if (tableState.sort.predicate) vm.sortedField = tableState.sort.predicate;
            if (tableState.sort.reverse) {
                vm.sortDirection = "Desc"
            } else vm.sortDirection = "Asc";
            var searchStr="";

            if ((tableState.search.predicateObject !== undefined)&&(tableState.search.predicateObject.$ !== undefined))  {
                searchStr = tableState.search.predicateObject.$
/*
                userservice.getUsersBySeachParam(searchStr, function(users){
                    vm.users = users;
                    console.info('users='+users);
                    vm.isLoading = false;
*/
                    // vm.SearchMode=true;
                // })
            }
            userservice.getUsersForPage(pageNumber, pageSize, vm.roleName,vm.sortDirection,vm.sortedField, vm.onlyActive, searchStr, function(users, pageInfo){
                vm.users = users;
                console.info('users='+users);
                vm.pageInfo = pageInfo;
                // ctrl.displayed = result.data;
                tableState.pagination.numberOfPages = pageInfo.totalPages;//set the number of pages so the pagination can update
                vm.isLoading = false;
                vm.SearchMode=false;
            })




        }

    }
})();

