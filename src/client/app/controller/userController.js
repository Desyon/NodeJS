/**
 * Created by Eric on 09.06.2017.
 */

angular.module('ngCalendarApp.controllers')
.controller('UserController',
    function userCtrl($scope, $log, $q, $http,
        REST_API_ENDPOINT, $localStorage, $rootScope, $location, notification) {
      $log.debug('Initializing UserController');

      $scope.updateUser = function () {
        $http.defaults.headers.common.Authorization = $localStorage.currentToken;
        $http.defaults.headers.common.Username = $rootScope.username;
        let deferred = $q.defer();

        $log.debug('UserService - Sending Put Request');

        let password = $scope.user.password;
        let confirm = $scope.user.confirmPW;
        let email = $scope.user.email;
        let dob = $scope.user.dob;
        let name = $scope.user.name;

        if (confirm !== password) {
          notification.error({data: {errmsg: 'Passwords do not match'}});
          password = undefined;
          confirm = undefined;
          $scope.user.password = undefined;
          $scope.user.confirmPW = undefined;
          deferred.reject({data: {errmsg: 'Passwords do not match'}});
          return deferred.promise;
        }

        if (password === '') {
          $scope.user.password = undefined;
          $scope.user.confirmPW = undefined;
          password = undefined;
          confirm = undefined;
        }

        let data = {
          'name': name,
          'email': email,
          'dob': dob,
          'password': password,
        };

        $log.debug(username);

        $http.put(REST_API_ENDPOINT + '/user/', data)
        .then(function (response) {
              deferred.resolve(response.data);
              notification.success(response);
              $log.debug('UserService - User updated');
            },
            function (response) {
              notification.error(response);
              $log.error('UserService - Failed to update user');
              deferred.reject(response);
            });
        return deferred.promise;
      };

      $scope.deleteUser = function () {
        $http.defaults.headers.common.Authorization = $localStorage.currentToken;
        $http.defaults.headers.common.Username = $rootScope.username;
        let deferred = $q.defer();

        $log.debug('UserService - Sending Delete Request');

        $http.delete(REST_API_ENDPOINT + '/user/')
        .then(function (response) {
              $localStorage.currentToken = undefined;

              $rootScope.isLoggedIn = false;
              $log.debug('UserService - User deleted');
              $location.path('/login');
              deferred.resolve(response.data);
            },
            function (response) {
              notification.error(response);
              $log.error('UserService - Failed to delete user');
              deferred.reject(response);
            });
        return deferred.promise;
      };

      $scope.getUser = function () {
        $http.defaults.headers.common.Authorization = $localStorage.currentToken;
        $http.defaults.headers.common.Username = $rootScope.username;
        let deferred = $q.defer();

        $log.debug('UserService - Sending Get Request');

        $http.get(REST_API_ENDPOINT + '/user/')
        .then(function (response) {
              $log.debug('UserService - Got user');

              $scope.user.username = response.data.username;
              $scope.user.email = response.data.email;
              $scope.user.name = response.data.name;
              $scope.user.dob = new Date(response.data.dob);

              $log.debug(response);
              deferred.resolve(response.data);
            },
            function (response) {
              notification.error({data: {errmsg: 'Failed to get userdata'}});
              $log.error('UserService - Failed to get user');
              deferred.reject(response);
            });
        return deferred.promise;
      };
    }
);
