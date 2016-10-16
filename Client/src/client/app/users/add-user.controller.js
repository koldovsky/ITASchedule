(function() {
    'use strict';
    angular
        .module('app.administrator.users')
        .controller('addUsersController', addUsersController);

    addUsersController.$inject = ['$q', 'userservice', 'logger','$stateParams','$state'];
    function addUsersController($q, userservice, logger, $stateParams, $state) {
        var vm = this;
        vm.user={};
        vm.user=$stateParams.user;
        vm.roleName=$stateParams.roleName;
        vm.submit=submit;
        vm.create=create;
        vm.reset=reset;
        vm.userStatus=true;
        vm.addUserForm={};


        function submit(){
            var promises = [create(vm.user)];
            return $q.all(promises).then(function() {
                reset();
                logger.info('New user added!');
            }, function(){
                 logger.info('Can not update a user!');
            }
            );
        }

        function create(newUser){
            if (newUser.id==null) {
                var role = vm.roleName.toUpperCase();
                newUser.roles=[role];
                return userservice.createUser(newUser)
            }else{
                return userservice.updateUser(newUser)
            }
        }

        function reset(){
            vm.user={fullName:null,email:null,active:true,contactInfo:null,password:null,passwordConfirm:null};
            vm.addUserForm.$setPristine(); //reset Form
            vm.addUserForm.$setUntouched(); //reset Form
        }

        vm.cancel = function(){
            $state.go(vm.roleName.toLowerCase()+'s');
        }

    }
})();