/**
 * Created by Desyon on 09.06.2017.
 */

angular.module('ngCalendarApp.controllers')

.controller('LoginController',
    function loginCtrl($scope, $log, $q, $http,
        REST_API_ENDPOINT, $localStorage) {
      $log.debug('Initializing UserController');

      $scope.loginAs = function () {
        let deferred = $q.defer();

        $log.debug('UserService - Sending Post Request');
        let username = $scope.user.username;
        let password = $scope.user.password;

        let data = {
          'username': username,
          'password': password,
        };

        $http.post(REST_API_ENDPOINT + '/user/login', data)
        .then(function (response) {
            $localStorage.currentToken = response.data.token;
            $localStorage.username = username;
            $log.debug('LoginService - Logged in');
              deferred.resolve(response.data);
            },

            function (response) {
              $log.error('LoginService - Failed to log in');
              deferred.reject(response);
            });

        return deferred.promise;
      };
    }
);
