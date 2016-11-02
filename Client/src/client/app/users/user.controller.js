(function() {
    'use strict';
    angular
        .module('app.administrator.users')
        .controller('usersController', usersController);

    usersController.$inject = ['userservice','$state','$location'];
    function usersController(userservice, $state, $location){
        var vm = this;
        vm.roleName=$state.params.roleName;
        vm.isTeacher=(vm.roleName=='Teacher');
        vm.user={};
        vm.users=[];
        vm.state=$state;
        vm.isUser=isUser;
        vm.editUser=editUser;
        vm.showCalendar=showCalendar;
        vm.userSearch="";
        vm.callServer = callServer;
        vm.isLoading = true;

        var search = $location.search();
        vm.pageInfo = search.page||0;
        vm.pageSizeOptions = [3,5,10,20,100];
        vm.pageSize = 5;
        vm.currentPage=0;
        vm.sortedField = "fullName";
        vm.sortDirection="Asc";
        vm.onlyActive=false;
        vm.onlyActiveButton=onlyActiveButton;

        function isUser(currentUser) {
            var role;
            var roles=currentUser.roles;
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

        function showCalendar (user ) {
            var userForCalendar={};
            userForCalendar.name=user.fullName;
            userForCalendar.id=user.id;
            vm.state.go('calendarshell.filterpannel',{'teachers': [userForCalendar]});
        }
        function onlyActiveButton() {
            vm.onlyActive=!vm.onlyActive;
            callServer();
        }

        function callServer(tableState){
            var searchStr="";
            if (tableState) {
                vm.isLoading = true;
                var pagination = tableState.pagination;
                vm.pageSize = pagination.number || 3;
                vm.currentPage = ~~(pagination.start / vm.pageSize) || 0;
                if (tableState.sort.predicate) {
                    vm.sortedField = tableState.sort.predicate;
                }
                if (tableState.sort.reverse) {
                    vm.sortDirection = "Desc"
                } else vm.sortDirection = "Asc";
                if ((tableState.search.predicateObject !== undefined)&&(tableState.search.predicateObject.$ !== undefined))  {
                    searchStr = tableState.search.predicateObject.$;
                }
            }
            userservice.getUsersForPage(vm.currentPage, vm.pageSize, vm.roleName,vm.sortDirection,vm.sortedField, vm.onlyActive, searchStr, function(users, pageInfo){
                vm.users = users;
                console.info('users='+users);
                vm.pageInfo = pageInfo;
                if (tableState){
                    tableState.pagination.numberOfPages = pageInfo.totalPages;
                }
                vm.isLoading = false;
            })
        }
    }
})();

