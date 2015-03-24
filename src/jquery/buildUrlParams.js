'use strict';

di('buildUrlParams', function(di) {

  return function buildUrlParams(params) {
    return jQuery.param(params || {});
  }

});