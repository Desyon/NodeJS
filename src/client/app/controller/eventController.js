/**
 * Created by Eric on 09.06.2017.
 */

angular.module('ngCalendarApp.controllers')
.controller('EventController',
    function eventCtrl($scope, $log, $q, $http,
        REST_API_ENDPOINT, $rootScope, $localStorage) {
      $log.debug('Initializing EventController');

      $scope.createEvent = function () {
        let deferred = $q.defer();

        $log.debug('EventService - Sending Put Request');

        let title = $scope.event.title;
        let start = $scope.event.start;
        let end = $scope.event.end;
        let category = $scope.event.category;
        let owner = $rootScope.username;
        let location = $scope.event.location;
        let notes = $scope.event.notes;

        let allday = false;
        if ($scope.event.allday !== undefined) {
          allday = $scope.event.allday;
        }

        let data = {
          'title': title,
          'start': start,
          'end': end,
          'allday': allday,
          'category': category,
          'owner': owner,
          'location': location,
          'notes': notes,
        };

        $log.debug(data);

        $http.post(REST_API_ENDPOINT + '/event/create', data)
        .then(function (response) {
              deferred.resolve(response.data);
              $scope.getAllEvents();
              $log.debug('EventService - Event created');
            },
            function (response) {
              $log.error('EventService - Failed to create event');
              deferred.reject(response);
            });
        return deferred.promise;
      };

      $scope.updateEvent = function () {
        let deferred = $q.defer();

        $log.debug('EventService - Sending Put Request');

        let title = $scope.event.title;
        let start = $scope.event.start;
        let end = $scope.event.end;
        let allday = $scope.event.allday;
        let category = $scope.event.category;
        let location = $scope.event.location;
        let notes = $scope.event.notes;
        let owner = $rootScope.username;

        let id = $scope.event.id;

        let data = {
          'title': title,
          'start': start,
          'end': end,
          'allday': allday,
          'category': category,
          'location': location,
          'notes': notes,
          'owner': owner,
        };

        $http.put(REST_API_ENDPOINT + '/event/' + id, data)
        .then(function (response) {
              deferred.resolve(response.data);
              $scope.getAllEvents();
              $log.debug('EventService - Event updated');
            },
            function (response) {
              $log.error('EventService - Failed to update event');
              deferred.reject(response);
            });
        return deferred.promise;
      };

      $scope.deleteEvent = function (event) {
        let deferred = $q.defer();

        $log.debug('EventService - Sending Delete Request');

        $log.debug($scope);
        $log.debug(event);

        let id = event._id;

        $http.delete(REST_API_ENDPOINT + '/event/' + id)
        .then(function (response) {
              deferred.resolve(response.data);
              $scope.getAllEvents();
              $log.debug('EventService - Event deleted');
            },
            function (response) {
              $log.error('EventService - Failed to delete event');
              deferred.reject(response);
            });
        return deferred.promise;
      };

      $scope.getEvent = function () {
        let deferred = $q.defer();

        $log.debug('EventService - Sending Get Request');
        let id = $scope.event.id;

        $http.get(REST_API_ENDPOINT + '/event/' + id)
        .then(function (response) {
              deferred.resolve(response.data);

              $scope.event = response.data;
              $log.debug('EventService - Event received');
            },
            function (response) {
              $log.error('EventService - Failed to get event');
              deferred.reject(response);
            });
        return deferred.promise;
      };

      $scope.getAllEvents = function () {
        let deferred = $q.defer();

        $log.debug('EventService - Sending Get Request');

        $http.get(REST_API_ENDPOINT + '/event/all')
        .then(function (response) {
              deferred.resolve(response.data);
              $scope.allEvents = response.data;
              $log.debug('EventService - Events received');
            },
            function (response) {
              $log.error('EventService - Failed to get events');
              deferred.reject(response);
            });
        return deferred.promise;
      };
    }
);
