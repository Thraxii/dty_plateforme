(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('Lesson_doneController', Lesson_doneController);

    Lesson_doneController.$inject = ['$scope', '$state', 'Lesson_done', 'ParseLinks', 'AlertService'];

    function Lesson_doneController ($scope, $state, Lesson_done, ParseLinks, AlertService) {
        var vm = this;

        vm.lesson_dones = [];
        vm.loadPage = loadPage;
        vm.page = 0;
        vm.links = {
            last: 0
        };
        vm.predicate = 'id';
        vm.reset = reset;
        vm.reverse = true;




        loadAll();


        function loadAll () {
            Lesson_done.query({
                page: vm.page,
                size: 20,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data) {
                for (var i = 0; i < data.length; i++) {
                    vm.lesson_dones.push(data[i]);
                }
                console.log(vm.lesson_dones);
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function reset () {
            vm.page = 0;
            vm.lesson_dones = [];
            loadAll();
        }

        function loadPage(page) {
            vm.page = page;
            loadAll();
        }

        /*
        vm.convert = function(int){
        var res = 1;
            switch (Math.floor(int/20)) {
            case 0 :
                res = 1;
                break;
            case 1 :
                res = 2;
                break;
            case 2 :
                res = 3;
                break;
            case 3 :
                res = 4;
                break;
            case 4 :
                res = 5;
                break;
            case 5 :
                res = 5;
                break;
            }
         return "../../../content/images/" + res + "-stars.jpg" ;
        }
        // Useless for the moment
           */

    }
})();
