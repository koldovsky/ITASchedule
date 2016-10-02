(function() {
    'use strict';
    angular
        .module('app.administrator.teachers')
        .controller('addTeachersController', addTeachersController);

    addTeachersController.$inject = ['$q', 'teacherservice', 'logger'];
    function addTeachersController($q, teacherservice, logger) {
        var vm = this;
        vm.teacher={};
        vm.submit=submit;
        vm.create=create;
        vm.reset=reset;
        vm.teacherStatus=true;
        vm.addTeacherForm={};

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
            if (vm.teacher.id==null) {
                return teacherservice.createTeacher(newTeacher)
            }else{
                // teacherservice.updateUser(newTeacher,newTeacher.id);
                console.log('User updated with id ' + vm.teacher.id);
            }
        }

        function reset(){
            vm.teacher={fullName:null,email:null,isActive:null,contactInfo:null,password:null,passwordConfirm:null};
            vm.addTeacherForm.$setPristine(); //reset Form
            vm.addTeacherForm.$setUntouched(); //reset Form
            console.log('reset pressed');
        }
    }
})();