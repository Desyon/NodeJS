/**
 * Created by eric on 06.06.17.
 */

var app = angular.module("myApp", ['ngSanitize']);
app.controller("myCtrl", function($scope, $http) {
    $scope.eventList = $http.get('localhost:3000/event/all').then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
});

