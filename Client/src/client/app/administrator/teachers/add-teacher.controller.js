(function() {
    'use strict';
    angular
        .module('app.administrator.teachers')
        .controller('addTeachersController', addTeachersController);

    addTeachersController.$inject = ['$q', 'teacherservice', 'logger','$stateParams'];
    function addTeachersController($q, teacherservice, logger, $stateParams) {
        var vm = this;
        vm.teacher={};
        vm.teacher=$stateParams.teacher;
        vm.roleName=$stateParams.roleName;
        vm.submit=submit;
        vm.create=create;
        vm.reset=reset;
        vm.teacherStatus=true;
        vm.addTeacherForm={};
        console.log('vm.teacher:'+vm.teacher);


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

        function submit(){
            var promises = [create(vm.teacher)];
            console.log('Submit pressed');
            console.log(vm.teacher);
            console.log('status:'+vm.teacher.isActive);
            return $q.all(promises).then(function() {
                reset();
                logger.info('New teacher added!');
            });
        }

        function create(newTeacher){
            if (newTeacher.id==null) {
                var role = vm.roleName.toUpperCase();
                newTeacher.roles=[role];
                return teacherservice.createTeacher(newTeacher)
            }else{
                // teacherservice.updateUser(newTeacher,newTeacher.id);
                console.log('User updated with id ' + vm.teacher.id);
                return teacherservice.updateTeacher(newTeacher)
            }
        }

        function reset(){
            vm.teacher={fullName:null,email:null,isActive:true,contactInfo:null,password:null,passwordConfirm:null};
            vm.addTeacherForm.$setPristine(); //reset Form
            vm.addTeacherForm.$setUntouched(); //reset Form
            console.log('reset pressed');
        }

    }
})();