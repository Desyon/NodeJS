/**
 * Created by Desyon on 06.06.17.
 */

angular.module('ngCalendarApp', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.router',
  'ngCalendarApp.config',
  'ngCalendarApp.templates',
  'ngCalendarApp.controllers',
])

.config(function (ENABLE_DEBUG, $logProvider, $stateProvider, $qProvider,
    $urlRouterProvider) {
  $logProvider.debugEnabled(ENABLE_DEBUG);

  $urlRouterProvider.otherwise('/login');

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
