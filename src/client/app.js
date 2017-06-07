/**
 * Created by eric on 06.06.17.
 */

const app = angular.module('myApp', ['ngSanitize']);
let token = null;

app.controller('myCtrl', function ($scope, $http) {
  $scope.eventList = $http.get('localhost:3000/event/all').then(
      function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
});

const capp = angular.module('myApp', []);
capp.controller('formCtrl', function ($scope, $http) {
  $scope.master = {username: 'John', password: 'Doe'};
  $scope.login = function () {
    console.log($scope.user);
    let data = JSON.stringify({'username': 'someuser', 'password': 'password'});
    $http({
      method: 'POST',
      url: 'http://localhost:3000/user/login',
      data: data,
      headers: {'Content-Type': 'application/json'},
    }).then(function (successCallback) {
    }, function (errorCallback) {
    });
    /* token = $http({
     method: 'POST', url: 'http://localhost:3000/user/login', headers: {
     'Content-Type': 'application/json',
     }, data: $scope.user,
     }).then(function successCallback(response) {
     token = response;
     // this callback will be called asynchronously
     // when the response is available
     }, function errorCallback(response) {
     token = response;

     // called asynchronously if an error occurs
     // or server returns response with an error status.
     }); */
    /*        token = $http.post('http://localhost:3000/user/login', $scope.user, header).then(function successCallback(response) {
     token = response;
     // this callback will be called asynchronously
     // when the response is available
     }, function errorCallback(response) {
     token = response;

     // called asynchronously if an error occurs
     // or server returns response with an error status.
     });*/
    $scope.user = angular.copy($scope.master);
  };
  $scope.login();
});
