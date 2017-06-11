/**
 * Created by Eric on 09.06.2017.
 */

angular.module('ngCalendarApp.controllers')
.controller('EventController',
    function eventCtrl($scope, $log, $q, $http,
        REST_API_ENDPOINT, $rootScope, $location, $localStorage, notification) {
      $log.debug('Initializing EventController');

      $scope.deleteEvent = function (event) {
        let deferred = $q.defer();

        $log.debug('EventService - Sending Delete Request');

        let id = event._id;

        $http.delete(REST_API_ENDPOINT + '/event/' + id)
        .then(function (response) {
              deferred.resolve(response.data);
              $scope.getAllEvents();
              $log.debug('EventService - Event deleted');
            },
            function (response) {
              notification.error(response);
              $log.error('EventService - Failed to delete event');
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
              notification.error(response);
              $log.error('EventService - Failed to get events');
              deferred.reject(response);
            });
        return deferred.promise;
      };

      $scope.addUpdateEvent = function (event) {
        if (event !== undefined) {
          $rootScope.event = event;
        }
        $location.path('/eventDetail');
      };

      $scope.createOrUpdate = function () {
        let deferred = $q.defer();

        let title;

        let startTime;
        let endTime;

        let startDate;
        let endDate;

        let category;
        let location;
        let notes;

        if (!($rootScope.event === undefined || $rootScope.event === null)) {
          title = $rootScope.event.title;

          startDate = $rootScope.event.startDate;
          startTime = $rootScope.event.startTime;

          endDate = $rootScope.event.endDate;
          endTime = $rootScope.event.endTime;

          category = $rootScope.event.category.name;
          location = $rootScope.event.location;
          notes = $rootScope.event.notes;
        } else {
          title = $scope.event.title;

          startDate = $scope.event.startDate;
          startTime = $scope.event.startTime;

          endDate = $scope.event.endDate;
          endTime = $scope.event.endTime;

          category = $scope.event.category.name;
          location = $scope.event.location;
          notes = $scope.event.notes;
        }

        let data = {
          'title': title,
          'startDate': new Date(startDate).getTime(),
          'startTime': new Date(startTime).getTime(),
          'endDate': new Date(endDate).getTime(),
          'endTime': new Date(endTime).getTime(),
          'category': category,
          'location': location,
          'notes': notes,
        };

        if (!($rootScope.event === undefined || $rootScope.event === null)) {
          $log.debug('EventService - Sending Put Request');

          let id = $rootScope.event._id;

          $http.put(REST_API_ENDPOINT + '/event/' + id, data)
          .then(function (response) {
                $scope.getAllEvents();
                deferred.resolve(response.data);
                $log.debug('EventService - Event updated');
              },
              function (response) {
                notification.error(response);
                $log.error('EventService - Failed to update event');
                deferred.reject(response);
              });

          $location.path('/events');
          delete $rootScope.event;
          return deferred.promise;
        } else {
          $log.debug('EventService - Sending Post Request');

          $http.post(REST_API_ENDPOINT + '/event/create', data)
          .then(function (response) {
                deferred.resolve(response.data);
                $scope.getAllEvents();
                $log.debug('EventService - Event created');
              },
              function (response) {
                notification.error(response);
                $log.error('EventService - Failed to create event');
                deferred.reject(response);
              });

          $location.path('/events');
          delete $rootScope.event;
          return deferred.promise;
        }
      };

      $scope.getAllCategories = function () {
        let deferred = $q.defer();

        $log.debug('CategoryService - Sending Get Request');

        $http.get(REST_API_ENDPOINT + '/category/all')
        .then(function (response) {
              deferred.resolve(response.data);
              $scope.allCategories = response.data;
              $log.debug('CategoryService - Categories received');
            },
            function (response) {
              $log.error('CategoryService - Failed to get Categories');
              notification.error(response);
              deferred.reject(response);
            });
        return deferred.promise;
      };

      $scope.getDateTime = function () {
        if ($rootScope.event === null || $rootScope.event === undefined) {
          return;
        }
        $scope.event.endDate = new Date($rootScope.event.endDate);
        $scope.event.endTime = new Date($rootScope.event.endTime);
        $scope.event.startDate = new Date($rootScope.event.startDate);
        $scope.event.startTime = new Date($rootScope.event.startTime);
      };
    }
)
;
