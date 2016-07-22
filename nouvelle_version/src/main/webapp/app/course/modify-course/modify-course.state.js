(function(){

    angular.module('objectifDtyApp').config(stateConfig);
    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('editCourse/modify', {

                parent: 'course',
                url:'/modify',
                data: {
                    authorities: ['ROLE_COACH', 'ROLE_ADMIN'],
                    pageTitle: 'Modify Course'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/course/modify-course/modify-course.html',
                        controller: 'courseModifyController',
                        controllerAs: 'vm'
                    }
                },

            })

    }


}());