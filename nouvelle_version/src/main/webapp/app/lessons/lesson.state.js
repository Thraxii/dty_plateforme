// Lesson.state : pour tous les états relatifs à la leçon à savoir : view, edit, create. ( edit et create ? )
(function(){

    angular.module('objectifDtyApp').config(stateConfig);
    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('lesson', {


                parent: 'app',
                url: '/lesson',
                data: {
                    authorities:['ROLE_USER','ROLE_COACH','ROLE_ADMIN'],
                    pageTitle: 'Lesson'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/lessons/lesson-view.html',
                        controller: 'LessonViewController',
                        controllerAs: 'vm'
                    }
                }
            })

    };


}());

