(function() {
'use strict';
    angular
        .module('app.administrator.teachers')
        .controller('teachersController', teachersController);

    teachersController.$inject = ['$q', 'teacherservice', 'logger','$scope', '$state' ];
    function teachersController($q, teacherservice, logger, $scope, $state) {
        var vm = this;
        vm.roleName=$state.params.roleName;
        vm.teacher={};
        vm.teachers=[];
        vm.displayedTeachers=[];
        vm.state=$state;
        vm.isTeacher=isTeacher;
        vm.editTeacher=editTeacher;
        vm.remove=remove;
        vm.calendar=calendar;

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
            vm.state.go('add'+vm.roleName,{'teacher': teacher});
        };

        function calendar (teacher ) {
            vm.state.go('calendar');
        };

        function remove(teacher){
            var promises = [deleteTeacher(teacher.id)];
            return $q.all(promises).then(function() {
                fetchAllTeachers();
                logger.info('Techer is deleted!');
            });
        }

        function deleteTeacher(id){
            return teacherservice.deleteTeacher(id).then(function(data) {
                return vm.teachers;
            })
        }
    }
})();
