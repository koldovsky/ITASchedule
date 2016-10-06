(function() {
'use strict';
    angular
        .module('app.administrator.teachers')
        .controller('teachersController', teachersController);

    teachersController.$inject = ['$q', 'teacherservice', 'logger','$scope', '$stateParams', '$state' ];
    function teachersController($q, teacherservice, logger, $scope, $stateParams,$state) {
        var vm = this;
        vm.roleName=$stateParams.roleName;
        vm.teacher={};
        vm.teachers=[];
        vm.displayedTeachers=[];
        vm.state=$state;
        vm.isTeacher=isTeacher;
        vm.editTeacher=editTeacher;
        vm.remove=remove;

        fetchAllTeachers();

        function fetchAllTeachers(){
            var promises = [getTeachers()];
            return $q.all(promises).then(function() {
                logger.info('Activated Teachers View');
            });
        }
        function getTeachers() {
            return teacherservice.getTeachers().then(function(data) {
                vm.teachers = data._embedded.users;
                console.log("---------------teachers----------------");
                console.log(vm.teachers);
                return vm.teachers;
            });
        }

        function isTeacher(currentTeacher) {
            var role;
            var isTeach;
            var roles=currentTeacher.roles
            var len = roles.length;
            var i;
            for (i=0; i<len; i++) {
                if (i in roles) {
                    role = roles[i];
                    if (role == vm.roleName.toUpperCase()) return true;
                }
            }
            return false;
        }


        function editTeacher (teacher ) {
            console.log('editTeacher pressed. Teacher: ' + teacher.fullName);
            console.log('editTeacher pressed. $state: ' + $state);
            console.log('editTeacher pressed. vm.state: ' + vm.state);

            vm.editTeacher.fullName = (teacher.fullName);
            console.log('editTeacher pressed. vm.editTeacher.fullName: ' + vm.editTeacher.fullName);
            vm.state.go('add'+vm.roleName,{'teacher': teacher});
        };

        function remove(teacher){
            console.log('remove button pressed');
            console.log('Teacher to be deleted', teacher);
            console.log('id to be deleted', teacher.id);
            var promises = [deleteTeacher(teacher.id)];
            return $q.all(promises).then(function() {
                fetchAllTeachers();
                logger.info('Techer is deleted!');
            });
        }

        function deleteTeacher(id){
            return teacherservice.deleteTeacher(id).then(function(data) {
                console.log('id to service:', id);
                return vm.teachers;
            })
        }
    }
})();
