/**
 * Created by Eric on 09.06.2017.
 */

angular.module('ngCalendarApp.controllers')
.controller('UserController',
    function userCtrl($scope, $log, $q, $http,
        REST_API_ENDPOINT, $localStorage, $rootScope) {
      $log.debug('Initializing UserController');

      $scope.updateUser = function () {
        let deferred = $q.defer();

        $log.debug('UserService - Sending Put Request');
        let username = $rootScope.username;
        let password = $scope.user.password;
        let email = $scope.user.email;
        let dob = $scope.user.dob;
        let name = $scope.user.name;

        let data = {
          'name': name,
          'email': email,
          'dob': dob,
          'password': password,
        };

        $log.debug(username);

        $http.put(REST_API_ENDPOINT + '/user/' + username, data)
        .then(function (response) {
              deferred.resolve(response.data);
              $log.debug('UserService - User updated');
            },
            function (response) {
              $log.error('UserService - Failed to update user');
              deferred.reject(response);
            });
        return deferred.promise;
      };

      $scope.deleteUser = function () {
        let deferred = $q.defer();

        $log.debug('UserService - Sending Delete Request');

        $http.delete(REST_API_ENDPOINT + '/user/')
        .then(function (response) {
              delete $localStorage.token;
              delete $rootScope.username;
              $rootScope.isLoggedIn = false;
              $log.debug('UserService - User deleted');
              deferred.resolve(response.data);
            },
            function (response) {
              $log.error('UserService - Failed to delete user');
              deferred.reject(response);
            });
        return deferred.promise;
      };
    }
);
