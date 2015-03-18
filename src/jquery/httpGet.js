'use strict';

var httpGetCache = {};
var httpGet = function(url, params) {
  var
    Promise = getService('Promise'),
    cache = httpGetCache,
    urlBuilder = [url],
    query,
    promise,
    resolve,
    reject;

  params = params || {};
  query = jQuery.param(params);
  if (query) {
    urlBuilder.push(query);
  }
  url = urlBuilder.join('?');

  if (cache.hasOwnProperty(url)) {
    return cache[url];
  }

  cache[url] = promise = new Promise(function(_resolve, _reject) {
    resolve = _resolve;
    reject = _reject;
  });

  jQuery.get(url, params)
    .done(resolve)
    .fail(reject)
  ;

  return promise;
};