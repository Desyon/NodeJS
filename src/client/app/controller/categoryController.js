/**
 * Created by Eric on 09.06.2017.
 */

angular.module('ngCalendarApp.controllers')
.controller('CategoryController',
    function categoryCtrl($scope, $log, $q, $http,
        REST_API_ENDPOINT, $rootScope, $location, $localStorage, notification) {
      $log.debug('Initializing CategoryController');

      $scope.deleteCategory = function (category) {
        let deferred = $q.defer();
        let id = category._id;

        $log.debug('CategoryService - Sending Delete Request');

        $http.delete(REST_API_ENDPOINT + '/category/' + id)
        .then(function (response) {
              $scope.getAllCategories();
              deferred.resolve(response.data);
              notification.success(response);
              $log.debug('CategoryService - Category deleted');
            },
            function (response) {
              notification.error(response);
              $log.error('CategoryService - Failed to delete category');
              deferred.reject(response);
            });
        return deferred.promise;
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

      $scope.addUpdateCategory = function (category) {
        $log.debug('Inside addUpdateCategory');
        if (category !== undefined) {
          $rootScope.category = category;
        }
        $location.path('/categoryDetail');
      };

      $scope.createOrUpdate = function () {
        $log.debug('Inside createOrUpdate');

        let deferred = $q.defer();

        let name;
        let color;
        let description;

        if ($rootScope.category !== null) {
          name = $rootScope.category.name;
          color = $rootScope.category.color;
          description = $rootScope.category.description;
        } else {
          name = $scope.category.name;
          color = $scope.category.color;
          description = $scope.category.description;
        }

        let data = {
          'name': name,
          'color': color,
          'description': description,
        };

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
                notification.error(response);
                deferred.reject(response);
              });
          $location.path('/categories');
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
                notification.error(response);
                deferred.reject(response);
              });
          $location.path('/categories');
          return deferred.promise;
        }
      };
    }
);
