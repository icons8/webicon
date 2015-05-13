'use strict';

di('buildUrlParams', function(injector) {

  return function buildUrlParams(params) {
    var
      parts = [];

    params = params || {};
    Object.keys(params)
      .filter(function() {
        return typeof params[key] != 'undefined' && params[key] !== null;
      })
      .map(function(key) {
        return !Array.isArray(params[key])
          ? [params[key]]
          : params[key];
      })
      .forEach(function(key) {
        params[key].forEach(function(value) {
          parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value + ''));
        });
      });

    return parts.join('&');
  };

});