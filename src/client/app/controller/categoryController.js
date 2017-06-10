/**
 * Created by Eric on 09.06.2017.
 */

angular.module('ngCalendarApp.controllers')
.controller('CategoryController',
    function categoryCtrl($scope, $log, $q, $http,
        REST_API_ENDPOINT, $rootScope, $location) {
      $log.debug('Initializing CategoryController');

      $scope.createCategory = function () {
        $http.defaults.headers.common.Authorization = $localStorage.currentToken;
        $http.defaults.headers.common.Username = $rootScope.username;
        let deferred = $q.defer();

        $log.debug('CategoryService - Sending Put Request');

        let name = $scope.category.name;
        let color = $scope.category.color;
        let description = $scope.category.description;

        let data = {
          'name': name,
          'color': color,
          'description': description,
        };

        $http.post(REST_API_ENDPOINT + '/category/create', data)
        .then(function (response) {
              deferred.resolve(response.data);
              $scope.getAllCategories();
              $log.debug('CategoryService - Category created');
              $location.path('/categories');
            },
            function (response) {
              $log.error('CategoryService - Failed to create category');
              deferred.reject(response);
            });
        return deferred.promise;
      };

      $scope.updateCategory = function () {
        $http.defaults.headers.common.Authorization = $localStorage.currentToken;
        $http.defaults.headers.common.Username = $rootScope.username;
        let deferred = $q.defer();

        $log.debug('CategoryService - Sending Put Request');

        let name = $scope.category.name;
        let color = $scope.category.color;
        let description = $scope.category.description;

        let data = {
          'name': name,
          'color': color,
          'description': description,
        };

        let id = $scope.category.id;

        $http.put(REST_API_ENDPOINT + '/category/' + id, data)
        .then(function (response) {
              $scope.getAllCategories();
              deferred.resolve(response.data);
              $location.path('/categories');
              $log.debug('CategoryService - Category updated');
            },
            function (response) {
              $log.error('CategoryService - Failed to update category');
              deferred.reject(response);
            });
        return deferred.promise;
      };

      $scope.deleteCategory = function (category) {
        $http.defaults.headers.common.Authorization = $localStorage.currentToken;
        $http.defaults.headers.common.Username = $rootScope.username;
        let deferred = $q.defer();
        let id = category._id;

        $log.debug('CategoryService - Sending Delete Request');

        $http.delete(REST_API_ENDPOINT + '/category/' + id)
        .then(function (response) {
              $scope.getAllCategories();
              deferred.resolve(response.data);
              $log.debug('CategoryService - Category deleted');
            },
            function (response) {
              $log.error('CategoryService - Failed to delete category');
              deferred.reject(response);
            });
        return deferred.promise;
      };

      $scope.getCategory = function (id) {
        $http.defaults.headers.common.Authorization = $localStorage.currentToken;
        $http.defaults.headers.common.Username = $rootScope.username;
        let deferred = $q.defer();
        $log.debug('Inside getCategory');

        $log.debug(id);
        $log.debug('CategoryService - Sending Get Request');

        $http.get(REST_API_ENDPOINT + '/category/' + id)
        .then(function (response) {
              deferred.resolve(response.data);
              $log.debug('CategoryService - Category received');
            },
            function (response) {
              $log.error('CategoryService - Failed to get category');
              deferred.reject(response);
            });
        return deferred.promise;
      };

      $scope.getAllCategories = function () {
        $http.defaults.headers.common.Authorization = $localStorage.currentToken;
        $http.defaults.headers.common.Username = $rootScope.username;
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

      $scope.addUpdateCategory = function (category) {
        $http.defaults.headers.common.Authorization = $localStorage.currentToken;
        $http.defaults.headers.common.Username = $rootScope.username;
        $log.debug('Inside addUpdateCategory');
        if (category !== undefined) {
          $rootScope.category = category;
        }
        $location.path('/categoryDetail');
      };

      $scope.createOrUpdate = function () {
        $http.defaults.headers.common.Authorization = $localStorage.currentToken;
        $http.defaults.headers.common.Username = $rootScope.username;
        $log.debug('Inside createOrUpdate');

        let deferred = $q.defer();

        let name;
        let color;
        let description;

        $log.debug('rootScope');
        $log.debug($rootScope);

        $log.debug('scope');
        $log.debug($scope);

        if ($rootScope.category !== null) {
          name = $rootScope.category.name;
          color = $rootScope.category.color;
          description = $rootScope.category.description;
        } else {
          name = $scope.category.name;
          color = $scope.category.color;
          description = $scope.category.description;
        }

        $log.debug($rootScope);

        let data = {
          'name': name,
          'color': color,
          'description': description,
        };

        $log.debug('Created Payload');

        if ($rootScope.category !== null) {
          $log.debug('CategoryService - Sending Put Request');

          let id = $rootScope.category._id;

          $http.put(REST_API_ENDPOINT + '/category/' + id, data)
          .then(function (response) {
                $scope.getAllCategories();
                deferred.resolve(response.data);
                $log.debug('CategoryService - Category updated');
              },
              function (response) {
                $log.error('CategoryService - Failed to update category');
                deferred.reject(response);
              });
          return deferred.promise;
        } else {
          $log.debug('CategoryService - Sending Post Request');

          $http.post(REST_API_ENDPOINT + '/category/create', data)
          .then(function (response) {
                deferred.resolve(response.data);
                $scope.getAllCategories();
                $log.debug('CategoryService - Category created');
              },
              function (response) {
                $log.error('CategoryService - Failed to create category');
                deferred.reject(response);
              });
          return deferred.promise;
        }
        delete $rootScope.category;
        $location.path('/categories');
      };
    }
);
