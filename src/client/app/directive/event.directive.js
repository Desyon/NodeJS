angular.module('ngCalendarApp.directives.event', [
  'ngCalendarApp.event.controller',
])

.directive('event', [
  /**
   * @ngdoc directive
   * @name event
   * @scope
   *
   * @description
   * event directive
   */
      function () {
    return {
      restrict: 'E',
      transclude: {
        label: '?eventLabel',
        buttons: '?eventButtons',
      },
      scope: {
        event: '=',
        readOnly: '<',
      },
      templateUrl: 'views/events.tpl.html',
      controller: 'EventController',
    };
  },
]);
