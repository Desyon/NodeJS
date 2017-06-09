/**
 * Created by Desyon on 06.06.17.
 */

angular.module('ngCalendarApp', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.router',
  'ui-notification',
  'ngCalendarApp.config',
  'ngCalendarApp.templates',
  'ngCalendarApp.controllers',
])

.config(
    function (ENABLE_DEBUG, $logProvider, $stateProvider, NotificationProvider,
        $urlRouterProvider) {
      $logProvider.debugEnabled(ENABLE_DEBUG);

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
        controller: 'AccountController',
      });
    })

.run(['$rootScope', '$location', '$http',
  function ($rootScope, $location, $http) {
  },
])

.controller('AppController',
    function ($log) {
      $log.debug('CalendarApp initialized');
    }
);

angular.module('ngCalendarApp.controllers', []);
