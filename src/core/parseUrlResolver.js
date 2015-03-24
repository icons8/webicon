'use strict';

di('parseUrlResolver', function(di) {

  return function parseUrlResolver(urlConfig) {
    var
      mergeObjects = di('mergeObjects'),
      url,
      urlFn,
      params = null;

    if (url && typeof url == 'object') {
      url = urlConfig.url;
      params = urlConfig.params;
    }
    else {
      url = urlConfig;
    }

    urlFn = (typeof url == 'function')
      ? url
      : function() { return url; };

    return function(/* value[, value[, ...]]] */) {
      var
        urlConfig,
        _params = null,
        url
        ;

      urlConfig = urlFn.apply(null, Array.prototype.slice.call(arguments));
      url = urlConfig;
      if (urlConfig && typeof urlConfig == 'object') {
        url = urlConfig.url;
        _params = urlConfig.params;
      }

      return {
        url: url,
        params: mergeObjects({}, params || {}, _params || {})
      }
    };
  }

});