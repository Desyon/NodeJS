/**
 * Created by Desyon on 09.06.2017.
 */

angular.module('ngCalendarApp')
.service('backend', function (REST_API_ENDPOINT, Notification, $http) {
  function success(successMessage) {
    if ('string' === typeof successMessage) {
      Notification.success(successMessage);
    }
  }

  function error(errorMessage) {
    if ('401' === errorMessage.status) {
      Notification.error('You are not logged in.');
    } else {
      Notification.error(errorMessage.data.error);
    }
  }

  this.post = function (route, payload, ret, successMessage, errorHandling) {
    // fallback if ret is undefined
    if ('undefined' === typeof ret) {
      ret = function (response) {
        console.log(response);
      };
    }

    $http({
      method: 'POST',
      url: REST_API_ENDPOINT + route,
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 3000,
    }).then(function successResponse(response) {
      success(successMessage);
      ret(response);
      return response;
    }, function errorResponse(response) {
      if (!errorHandling) {
        error(response);
      } else {
        ret(response);
        return response;
      }
    });
  };

  this.get = function (route, ret, successMessage, errorHandling) {
    if ('undefined' === typeof ret) {
      ret = function (response) {
        console.log(response);
      };
    }

    $http({
      method: 'GET',
      url: REST_API_ENDPOINT + route,
      timeout: 3000,
    }).then(function successResponse(response) {
      success(successMessage);
      ret(response);
      return response;
    }, function errorResponse(response) {
      if (!errorHandling) {
        error(response);
      } else {
        ret(response);
        return response;
      }
    });
  };

  this.put = function (route, payload, ret, successMessage, errorHandling) {
    // fallback if ret is undefined
    if ('undefined' === typeof ret) {
      ret = function (response) {
        console.log(response);
      };
    }

    $http({
      method: 'PUT',
      url: REST_API_ENDPOINT + route,
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 3000,
    }).then(function successResponse(response) {
      success(successMessage);
      ret(response);
      return response;
    }, function errorResponse(response) {
      if (!errorHandling) {
        error(response);
      } else {
        ret(response);
        return response;
      }
    });
  };

  this.delete = function (route, ret, successMessage, errorHandling) {
    // fallback if ret is undefined
    if ('undefined' === typeof ret) {
      ret = function (response) {
        console.log(response);
      };
    }

    $http({
      method: 'POST',
      url: REST_API_ENDPOINT + route,
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 3000,
    }).then(function successResponse(response) {
      success(successMessage);
      ret(response);
      return response;
    }, function errorResponse(response) {
      if (!errorHandling) {
        error(response);
      } else {
        ret(response);
        return response;
      }
    });
  };
});
