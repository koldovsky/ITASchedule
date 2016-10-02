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
        vm.addTeacherForm={};

        function submit(){
            var promises = [create(vm.teacher)];
            console.log('Submit pressed');
            console.log(vm.teacher);
            return $q.all(promises).then(function() {
                reset();
                logger.info('New teacher added!');
            });

        }

        function create(newTeacher){
            if (vm.teacher.id==null) {
                return teacherservice.createTeacher(newTeacher)
                    /*.then(function(data) {
                        console.log('saving new teacher');
                        return data;
                    })*/
            }else{
                // teacherservice.updateUser(newTeacher,newTeacher.id);
                console.log('User updated with id ' + vm.teacher.id);
            }
        }

        function reset(){
            vm.teacher={fullname:null,email:'',isActive:'true',contactInfo:''};
            vm.addTeacherForm.$setPristine(); //reset Form
            console.log('reset pressed');
        }
    }
})();