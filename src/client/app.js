/**
 * Created by eric on 06.06.17.
 */

var app = angular.module("myApp", ['ngSanitize']);
var token = null;
var datData = null;

app.controller("myCtrl", function($scope, $http) {
    $scope.eventList = $http.get('localhost:3000/event/all').then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
});

var capp = angular.module('myApp', []);
capp.controller('formCtrl', function($scope, $http) {
    $scope.master = {username: "John", password: "Doe"};
    $scope.login = function() {
        console.log($scope.user);
        token = $http({method: 'POST', url: 'http://localhost:3000/user/login', headers: {
            'Content-Type': 'application/json'}, data: {username: 'John', password: 'Doe'}
        }).then(function successCallback(response) {
            token = response;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            token = response;

            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
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