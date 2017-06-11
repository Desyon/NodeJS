/**
 * Created by Eric on 09.06.2017.
 */

angular.module('ngCalendarApp.controllers')
.controller('EventController',
    function eventCtrl($scope, $log, $q, $http,
        REST_API_ENDPOINT, $rootScope, $location, $localStorage, notification) {
      $log.debug('Initializing EventController');

      $scope.createEvent = function () {
        $http.defaults.headers.common.Authorization = $localStorage.currentToken;
        $http.defaults.headers.common.Username = $rootScope.username;
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
              $location.path('/events');
            },
            function (response) {
              $log.error('EventService - Failed to create event');
              deferred.reject(response);
            });
        return deferred.promise;
      };

      $scope.updateEvent = function () {
        $http.defaults.headers.common.Authorization = $localStorage.currentToken;
        $http.defaults.headers.common.Username = $rootScope.username;
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
              $location.path('/events');
              $log.debug('EventService - Event updated');
            },
            function (response) {
              $log.error('EventService - Failed to update event');
              deferred.reject(response);
            });
        return deferred.promise;
      };

      $scope.deleteEvent = function (event) {
        $http.defaults.headers.common.Authorization = $localStorage.currentToken;
        $http.defaults.headers.common.Username = $rootScope.username;
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
              notification.error(response);
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
              notification.error(response);
              $log.error('EventService - Failed to get event');
              deferred.reject(response);
            });
        return deferred.promise;
      };

      $scope.getAllEvents = function () {
        $http.defaults.headers.common.Authorization = $localStorage.currentToken;
        $http.defaults.headers.common.Username = $rootScope.username;
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
        $http.defaults.headers.common.Authorization = $localStorage.currentToken;
        $http.defaults.headers.common.Username = $rootScope.username;
        $log.debug('Inside addUpdateEvent');
        if (event !== undefined) {
          $rootScope.event = event;
        }

        $location.path('/eventDetail');
      };

      $scope.createOrUpdate = function () {
        $http.defaults.headers.common.Authorization = $localStorage.currentToken;
        $http.defaults.headers.common.Username = $rootScope.username;
        $log.debug('Inside createOrUpdate');

        let deferred = $q.defer();

        let title;
        let start;
        let end;

        let startTime;
        let endTime;

        let startDate;
        let endDate;

        let allday = false;
        let category;
        let location;
        let notes;

        $log.debug('rootScope');
        $log.debug($rootScope);

        $log.debug('scope');
        $log.debug($scope);

        if (!($rootScope.event === undefined || $rootScope.event === null)) {
          title = $rootScope.event.title;

          $log.debug('Start Date');
          $log.debug($rootScope.event.start);

          let start = $rootScope.event.start.toString().substring(0, 10);
          let startTime = $scope.event.startTime;
          let whole = start + 'T' + startTime;

          $log.debug('Start string');
          $log.debug(whole);

          startDate = new Date(whole);

          $log.debug('End Date');
          $log.debug($rootScope.event.end);

          let end = $rootScope.event.end.toString().substring(0, 10);
          let endTime = $scope.event.endTime;
          whole = end + 'T' + endTime;

          $log.debug('End string');
          $log.debug(whole);

          endDate = new Date(whole);

          if ($rootScope.event.allday !== undefined) {
            allday = $rootScope.event.allday;
          }
          category = $rootScope.event.category;
          location = $rootScope.event.location;
          notes = $rootScope.event.notes;
        } else {
          title = $scope.event.title;

          start = $scope.event.start;
          startTime = $scope.event.startTime;

          let whole = start + 'T' + startTime;
          startDate = new Date(whole);

          $log.debug('All the start values');

          $log.debug(start);
          $log.debug(startTime);
          $log.debug(startDate);

          end = $scope.event.end;
          endTime = $scope.event.endTime;

          whole = end + 'T' + endTime;
          endDate = new Date(whole);

          if ($scope.event.allday !== undefined) {
            allday = $scope.event.allday;
          }
          category = $scope.event.category;
          location = $scope.event.location;
          notes = $scope.event.notes;
        }

        $log.debug(startDate);
        $log.debug(endDate);

        let data = {
          'title': title,
          'start': startDate,
          'end': endDate,
          'allday': allday,
          'category': category,
          'location': location,
          'notes': notes,
        };

        $log.debug('Created Payload');
        $log.debug(data);

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

      $scope.setStartTime = function () {
        $log.debug('In setStartTime');
        if (($scope.event !== undefined && $scope.event !== null)
            && ($scope.event.start !== undefined && $scope.event.start
            !== null)) {
          $scope.event.startTime = $scope.event.start.toString().substring(11,
              19);
          $scope.event.start = $scope.event.start.toString().substring(0, 10);
        }
      };

      $scope.setEndTime = function () {
        $log.debug('In setEndTime');
        if (($scope.event !== undefined && $scope.event !== null)
            && ($scope.event.end !== undefined && $scope.event.end !== null)) {
          $scope.event.endTime = $scope.event.end.toString().substring(11, 19);
          $scope.event.end = $scope.event.end.toString().substring(0, 10);
        }
      };
    }
);
