(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .factory('Principal', Principal);

    Principal.$inject = ['$q', 'Account','Student', 'Coach'];

    function Principal ($q, Account,Student, Coach) {
        var _identity,
            _authenticated = false;
        var _student;
        var _coach;

        var service = {
            authenticate: authenticate,
            hasAnyAuthority: hasAnyAuthority,
            hasAuthority: hasAuthority,
            identity: identity,
            isAuthenticated: isAuthenticated,
            isIdentityResolved: isIdentityResolved,
            getStudent: getStudent,
            getCoach: getCoach
        };

        return service;

        function authenticate (identity) {
            _identity = identity;
            _authenticated = identity !== null;
        }

        function hasAnyAuthority (authorities) {
            if (!_authenticated || !_identity || !_identity.authorities) {
                return false;
            }

            for (var i = 0; i < authorities.length; i++) {
                if (_identity.authorities.indexOf(authorities[i]) !== -1) {
                    return true;
                }
            }

            return false;
        }

        function hasAuthority (authority) {
            if (!_authenticated) {
                return $q.when(false);
            }

            return this.identity().then(function(_id) {
                return _id.authorities && _id.authorities.indexOf(authority) !== -1;
            }, function(){
                return false;
            });
        }

        function identity (force) {
            var deferred = $q.defer();

            if (force === true) {
                _identity = undefined;
            }

            // check and see if we have retrieved the identity data from the server.
            // if we have, reuse it by immediately resolving
            if (angular.isDefined(_identity)) {
                deferred.resolve(_identity);

                return deferred.promise;
            }

            // retrieve the identity data from the server, update the identity object, and then resolve.
            Account.get().$promise
                .then(getAccountThen)
                .catch(getAccountCatch);

            return deferred.promise;

            function getAccountThen (account) {
                _identity = account.data;
                _authenticated = true;
                deferred.resolve(_identity);
            }

            function getAccountCatch () {
                _identity = null;
                _authenticated = false;
                deferred.resolve(_identity);
            }
        }

        function isAuthenticated () {
            return _authenticated;
        }

        function isIdentityResolved () {
            return angular.isDefined(_identity);
        }

        function getStudent(){
            var deferred=$q.defer();

            if (angular.isDefined(_student)){
                deferred.resolve(_student);
                return deferred.promise;
            }

            Student.query().$promise
                .then(function(data){
                    _student=data[0];
                    deferred.resolve(_student);
                });
            return deferred.promise

        }

        function getCoach(){
            var deferred=$q.defer();

            if (angular.isDefined(_coach)){
                deferred.resolve(_coach);
                return deferred.promise;
            }

            Coach.query().$promise
                .then(function(data){
                    _coach=data[0];
                    deferred.resolve(_coach);
                });
            return deferred.promise

        }


    }

})();
