'use strict';

di('httpGet', function(injector) {
  var
    cache = {};

  return function httpGet(url, params) {
    var
      jQuery = injector('jQuery'),
      Promise = injector('Promise'),
      buildUrlParams = injector('buildUrlParams'),
      urlBuilder = [url],
      compiledUrl,
      query,
      promise
      ;

    params = params || {};
    query = buildUrlParams(params);
    if (query) {
      urlBuilder.push(query);
    }
    compiledUrl = urlBuilder.join('?');

    if (cache.hasOwnProperty(compiledUrl)) {
      return cache[compiledUrl];
    }

    cache[compiledUrl] = promise = new Promise(function(resolve, reject) {
      jQuery.ajax({
        url: url,
        data: params,
        dataType: 'text',
        success: function(data) {
          resolve({
            data: data
          });
        },
        error: reject
      })
      ;
    });

    return promise;
  }

});
