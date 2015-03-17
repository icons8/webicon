
var svgLoader = {

  loadByUrl: function(urlConfig) {
    var
      httpGet = getService('httpGet'),
      log = getService('log'),
      Promise = getService('Promise'),
      el = getService('nodeWrapper'),
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
            : String(response.message || response.data || response.statusText);

        log.warn(message);
        return Promise.reject(message);
      });
  }

};