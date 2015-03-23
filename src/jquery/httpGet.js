'use strict';

service('httpGet', function(service) {

  var cache = {};

  return function httpGet(url, params) {
    var
      Promise = service('Promise'),
      urlBuilder = [url],
      compiledUrl,
      query,
      promise
      ;

    params = params || {};
    query = jQuery.param(params);
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
        dataType: 'text'
      })
        .done(function(data) {
          resolve({
            data: data
          });
        })
        .fail(reject)
      ;
    });

    return promise;
  }

});
