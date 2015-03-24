'use strict';

di('ImageIcon', function(di) {

  function ImageIcon(element) {
    var
      nodeWrapper = di('nodeWrapper')
      ;

    element = nodeWrapper(element);
    element.attr({
      width: '100%',
      height: '100%'
    });

    this.node = element[0];
  }

  ImageIcon.loadByUrl = function(urlConfig) {
    var
      buildUrlParams = di('buildUrlParams'),
      nodeWrapper = di('nodeWrapper'),
      Promise = di('Promise'),
      url = urlConfig,
      query,
      element
      ;

    if (typeof urlConfig == 'object') {
      url = urlConfig.url;
      query = buildUrlParams(urlConfig.params);
      if (query) {
        url = [url, query].join('?');
      }
    }

    return new Promise(function(resolve, reject) {
      element = nodeWrapper('<img>');
      element.bind('load', function() {
        resolve(new ImageIcon(element));
      });
      element.bind('error', reject);
      element.attr('src', url);
    });

  };

  ImageIcon.prototype = {

    clone: function() {
      return this.node.cloneNode(true);
    }

  };

  return ImageIcon;


});