/**
 * Created by Til on 11.06.2017.
 */

angular.module('ngCalendarApp')
.service('notification', function (Notification, $log) {
  this.success = function (successResponse) {
    $log.debug(successResponse.data.msg);
    Notification.success(successResponse.data.msg);
  };

  this.error = function (errorResponse) {
    $log.debug(errorResponse.data.errmsg);
    Notification.error(errorResponse.data.errmsg);
  };
});
