(function() {
'use strict';
    angular
        .module('app.administrator.users')
        .controller('usersController', usersController);

    usersController.$inject = ['$q', 'userservice', 'logger','$scope', '$state' ];
    function usersController($q, userservice, logger, $scope, $state) {
        var vm = this;
        vm.roleName=$state.params.roleName;
        vm.user={};
        vm.users=[];
        vm.displayedUsers=[];
        vm.state=$state;
        vm.isUser=isUser;
        vm.editUser=editUser;
        vm.calendar=calendar;
        vm.userSearch="";
        vm.itemsByPage=10;
        vm.pages=[5,10,15,20]

        fetchAllUsers();

        function fetchAllUsers(){
            var promises = [getUsers(vm.roleName)];
            return $q.all(promises).then(function() {
                logger.info('Activated Users View');
            });
        }
        function getUsers(role) {
            return userservice.getUsersByRole(vm.roleName).then(function(data) {
                vm.users = data;
                return vm.users;
            });
        }

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
            vm.state.go('calendar');
        }

    }
})();
