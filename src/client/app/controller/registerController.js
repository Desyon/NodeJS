/**
 * Created by Desyon on 09.06.2017.
 */

angular.module('ngCalendarApp.controllers')
.controller('RegisterController',
    function loginCtrl($scope, $log, $q, $http,
        REST_API_ENDPOINT, $localStorage) {
      $log.debug('Initializing RegisterController');

      $scope.register = function () {
        let deferred = $q.defer();

        if($scope.user.password !== $scope.user.confirmPW) {
            $log.debug('Passwords do not match');
            return deferred.reject('No Match');
        }

        $log.debug('RegisterService - Sending Post Request');
        let username = $scope.user.username;
        let password = $scope.user.password;

        let email;
        if ($scope.user.email) {
          email = $scope.user.email;
        }

        let dob;
        if ($scope.user.dob) {
          dob = $scope.user.dob;
        }

        let name;
        if ($scope.user.name) {
          name = $scope.user.name;
        }

        $log.debug(username + ' ' + password);

        let data = {
          'username': username,
          'name': name,
          'email': email,
          'dob': dob,
          'password': password,
        };

        $http.post(REST_API_ENDPOINT + '/user/create', data)
        .then(function (response) {
              $localStorage.currentToken = response.data.token;
              $localStorage.username = username;
              $log.debug($localStorage.username);
              deferred.resolve(response.data);
                $log.debug('RegisterService - User created');
            },

            function (response) {
              $log.error('RegisterService - Failed to create user');
              deferred.reject(response);
            });

        return deferred.promise;
      };
  }
);
