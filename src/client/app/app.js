/**
 * Created by Desyon on 06.06.17.
 */

angular.module('ngCalendarApp', [
  'ngAnimate',
  'ngStorage',
  'ui.bootstrap',
  'ui.router',
  'ui-notification',
  'ngCalendarApp.config',
  'ngCalendarApp.templates',
  'ngCalendarApp.controllers',
])

.config(
    function (ENABLE_DEBUG, $logProvider, $stateProvider, NotificationProvider,
        $urlRouterProvider, $httpProvider) {
      $logProvider.debugEnabled(ENABLE_DEBUG);
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
      $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
      //$httpProvider.defaults.headers.post['Authorizations'] = $localStorage.token;
      $urlRouterProvider.otherwise('/login');

      NotificationProvider.setOptions({
        delay: 2000,
        startTop: 10,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'left',
        positionY: 'bottom',
        closeOnClick: true,
        maxCount: 5,
      });

      $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/views/login.tpl.html',
        controller: 'LoginController',
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/views/register.tpl.html',
        controller: 'RegisterController',
      })
      .state('account', {
        url: '/account',
        templateUrl: 'app/views/account.tpl.html',
        controller: 'UserController',
      });
    })

.run(['$rootScope', '$location', '$http', '$localStorage',
  function ($rootScope, $location, $http, $localStorage) {
    $http.defaults.headers.common.Authorization = $localStorage.currentToken;
  },
])

.controller('AppController',
    function ($scope, $log, $localStorage) {
        $log.debug('CalendarApp initialized');


        $scope.logout = function () {
            delete $localStorage.username;
            delete $localStorage.token;
            $log.debug('AppService - User logged out');
        }
    }
);

angular.module('ngCalendarApp.controllers', []);
