'use strict';

di('buildUrlParams', function(injector) {
  return function buildUrlParams(params) {
    var
      jQuery = injector('jQuery');
    return jQuery.param(params || {});
  }

});