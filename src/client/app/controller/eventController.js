/**
 * Created by Eric on 09.06.2017.
 */

angular.module('ngCalendarApp.controllers')
    .controller('UserController',
        function eventCtrl($scope, $log, $q, $http,
                           REST_API_ENDPOINT, $localStorage) {
            $log.debug('Initializing EventController');

            $scope.createEvent = function() {
                let deferred = $q.defer();

                $log.debug('EventService - Sending Put Request');

                let title = $scope.event.title;
                let date = $scope.event.date;
                let time = $scope.event.time;
                let allday = $scope.event.allday;
                let category = $scope.event.category;
                let owner = $scope.event.owner;
                let location = $scope.event.location;
                let notes = $scope.event.notes;

                let data = {
                    "title": title,
                    "date": date,
                    "time": time,
                    "allday": allday,
                    "category": category,
                    "owner": owner,
                    "location": location,
                    "notes": notes,
                };

                $http.post(REST_API_ENDPOINT + '/event/create', data)
                    .then(function (response) {
                            deferred.resolve(response.data);

                            $log.debug('EventService - Event created');
                        },
                        function (response) {
                            $log.error('EventService - Failed to create event');
                            deferred.reject(response);
                        });
                return deferred.promise;
            };

            $scope.updateEvent = function() {
                let deferred = $q.defer();

                $log.debug('EventService - Sending Put Request');

                let title = $scope.event.title;
                let date = $scope.event.date;
                let time = $scope.event.time;
                let allday = $scope.event.allday;
                let category = $scope.event.category;
                let location = $scope.event.location;
                let notes = $scope.event.notes;

                let id = $scope.event.id;

                let data = {
                    "title": title,
                    "date": date,
                    "time": time,
                    "allday": allday,
                    "category": category,
                    "location": location,
                    "notes": notes,
                };

                $http.put(REST_API_ENDPOINT + '/event/' + id, data)
                    .then(function (response) {
                            deferred.resolve(response.data);
                            $log.debug('EventService - Event updated');
                        },
                        function (response) {
                            $log.error('EventService - Failed to update event');
                            deferred.reject(response);
                        });
                return deferred.promise;
            };

            $scope.deleteEvent = function() {
                let deferred = $q.defer();

                $log.debug('EventService - Sending Delete Request');
                let id = $scope.event.id;

                $http.delete(REST_API_ENDPOINT + '/event/' + id)
                    .then(function (response) {
                            deferred.resolve(response.data);
                            $log.debug('EventService - Event deleted');
                        },
                        function (response) {
                            $log.error('EventService - Failed to delete event');
                            deferred.reject(response);
                        });
                return deferred.promise;
            };

            $scope.getEvent = function() {
                let deferred = $q.defer();

                $log.debug('EventService - Sending Get Request');
                let id = $scope.event.id;

                $http.get(REST_API_ENDPOINT + '/event/' + id)
                    .then(function (response) {
                            deferred.resolve(response.data);

                            $scope.event.title = response.data.title;
                            $scope.event.date = response.data.date;
                            $scope.event.time = response.data.time;
                            $scope.event.allday = response.data.allday;
                            $scope.event.category = response.data.category;
                            $scope.event.owner = response.data.owner;
                            $scope.event.location = response.data.location;
                            $scope.event.notes = response.data.notes;
                            $scope.event.id = response.data.id;

                            $log.debug('EventService - Event received');
                        },
                        function (response) {
                            $log.error('EventService - Failed to get event');
                            deferred.reject(response);
                        });
                return deferred.promise;
            };

            $scope.getAllEvents = function() {
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
