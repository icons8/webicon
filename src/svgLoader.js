
var svgLoader = {

  loadByUrl: function(url) {
    var
      httpGet = getService('httpGet'),
      log = getService('log'),
      Promise = getService('Promise'),
      el = getService('nodeWrapper')
      ;

    return httpGet(url)
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