/**
 * Created by Eric on 09.06.2017.
 */

angular.module('ngCalendarApp.controllers')
    .controller('UserController',
        function categoryCtrl($scope, $log, $q, $http,
                           REST_API_ENDPOINT, $localStorage) {
            $log.debug('Initializing CategoryController');

            $scope.createCategory = function() {
                let deferred = $q.defer();

                $log.debug('CategoryService - Sending Put Request');

                let name = $scope.category.name;
                let color = $scope.category.color;
                let description = $scope.category.description;

                let data = {
                    "name": name,
                    "color": color,
                    "description": description,
                };

                $http.post(REST_API_ENDPOINT + '/category/create', data)
                    .then(function (response) {
                            deferred.resolve(response.data);

                            $log.debug('CategoryService - Category created');
                        },
                        function (response) {
                            $log.error('CategoryService - Failed to create category');
                            deferred.reject(response);
                        });
                return deferred.promise;
            };

            $scope.updateCategory = function() {
                let deferred = $q.defer();

                $log.debug('CategoryService - Sending Put Request');

                let name = $scope.category.name;
                let color = $scope.category.color;
                let description = $scope.category.description;

                let data = {
                    "name": name,
                    "color": color,
                    "description": description,
                };

                let id = $scope.category.id;

                $http.put(REST_API_ENDPOINT + '/category/' + id, data)
                    .then(function (response) {
                            deferred.resolve(response.data);
                            $log.debug('CategoryService - Category updated');
                        },
                        function (response) {
                            $log.error('CategoryService - Failed to update category');
                            deferred.reject(response);
                        });
                return deferred.promise;
            };

            $scope.deleteCategory = function() {
                let deferred = $q.defer();

                $log.debug('CategoryService - Sending Delete Request');
                let id = $scope.category.id;

                $http.delete(REST_API_ENDPOINT + '/category/' + id)
                    .then(function (response) {
                            deferred.resolve(response.data);
                            $log.debug('CategoryService - Category deleted');
                        },
                        function (response) {
                            $log.error('CategoryService - Failed to delete category');
                            deferred.reject(response);
                        });
                return deferred.promise;
            };

            $scope.getCategory = function() {
                let deferred = $q.defer();

                $log.debug('CategoryService - Sending Get Request');
                let id = $scope.category.id;

                $http.get(REST_API_ENDPOINT + '/category/' + id)
                    .then(function (response) {
                            deferred.resolve(response.data);

                            $scope.category.name = response.data.title;
                            $scope.category.owner = response.data.owner;
                            $scope.category.color = response.data.color;
                            $scope.category.description = response.data.description;
                            $scope.category.id = response.data.id;

                            $log.debug('CategoryService - Category received');
                        },
                        function (response) {
                            $log.error('CategoryService - Failed to get category');
                            deferred.reject(response);
                        });
                return deferred.promise;
            };

            $scope.getAllCategories = function() {
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
                            deferred.reject(response);
                        });
                return deferred.promise;
            };
        }
    );
