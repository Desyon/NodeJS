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
          .state('events', {
              url: '/events',
              templateUrl: 'app/views/event.tpl.html',
              controller: 'EventController',
          })
      .state('account', {
        url: '/account',
        templateUrl: 'app/views/account.tpl.html',
        controller: 'UserController',
      });
    })

.run(
  function ($rootScope, $location, $http, $localStorage) {
    $http.defaults.headers.common.Authorization = $localStorage.currentToken;
    $rootScope.isLoggedIn = false;
  }
)

.controller('AppController',
    function ($scope, $log, $localStorage, $rootScope) {
      $log.debug('CalendarApp initialized');


        $scope.logout = function () {
            delete $localStorage.username;
            delete $localStorage.token;
            $rootScope.isLoggedIn = false;
            $log.debug('AppService - User logged out');
        };
    }
);

angular.module('ngCalendarApp.controllers', []);
