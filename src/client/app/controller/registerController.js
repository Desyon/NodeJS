/**
 * Created by Desyon on 09.06.2017.
 */

angular.module('ngCalendarApp.controllers')
.controller('RegisterController',
    function loginCtrl($scope, $log, $q, $http,
        REST_API_ENDPOINT) {
      $log.debug('Initializing RegisterController');

      $scope.register = function () {
        let deferred = $q.defer();

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

        $log.debug(data);

        $http.post(REST_API_ENDPOINT + '/user/create', data)
        .then(function (response) {
              deferred.resolve(response.data);
            },

            function (response) {
              $log.error('RegisterService - Failed to create user');
              deferred.reject(response);
            });

        return deferred.promise;
      };
    }
);
