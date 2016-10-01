(function() {
    'use strict';
    angular
        .module('app.administrator.teachers')
        .controller('addTeachersController', addTeachersController);

    addTeachersController.$inject = ['$q', 'teacherservice', 'logger'];
    function addTeachersController($q, teacherservice, logger) {
        var vm = this;
        vm.teacher={
/*            fullName : "",
            email : "",
            isActive: true,
            contactInfo:""*/
        };
        vm.submit=submit;

        function submit(){
            console.log('Submit pressed');
            console.log(vm.teacher);
        }
    }
})();