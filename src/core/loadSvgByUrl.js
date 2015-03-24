'use strict';

service('loadSvgByUrl', function(service) {

  return function loadSvgByUrl(urlConfig) {
    var
      httpGet = service('httpGet'),
      log = service('log'),
      Promise = service('Promise'),
      el = service('nodeWrapper'),
      url = urlConfig,
      params = null
      ;

    if (typeof urlConfig == 'object') {
      url = urlConfig.url;
      params = urlConfig.params;
    }

    return httpGet(url, params)
      .then(function(response) {
        var
          element = el('<div>').append(response.data),
          svgElement = element.find('svg');
        return svgElement.length > 0
          ? svgElement
          : element.children().first()
          ;
      }, function(response) {
        var
          message = typeof response == 'string'
            ? response
            : String(response.message || response.data || response.responseText || response.statusText);

        log.warn(message);
        return Promise.reject(message);
      });
  }

});
