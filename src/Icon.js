'use strict';

function Icon(node, iconSize) {

  if (node.tagName != 'svg') {
    node = getService('nodeWrapper')('<svg xmlns="http://www.w3.org/2000/svg">').append(node)[0];
  }

  if (!node.getAttribute('xmlns')) {
    node.setAttribute('xmlns', "http://www.w3.org/2000/svg");
  }

  iconSize = iconSize || iconManager._defaultIconSize;

  var
    attributes = {
      fit: '',
      height: '100%',
      width: '100%',
      preserveAspectRatio: 'xMidYMid meet',
      viewBox: node.getAttribute('viewBox') || ('0 0 ' + iconSize + ' ' + iconSize)
    },

    styles = {
      "pointer-events": 'none',
      display: 'block'
    }
    ;

  Object.keys(attributes).forEach(function(name) {
    node.setAttribute(name, attributes[name]);
  });

  Object.keys(styles).forEach(function(name) {
    node.style[name] = styles[name];
  });

  this.node = node;
  this.iconSize = iconSize;
}

Icon.isIcon = function(value) {
  return value instanceof Icon;
};

Icon.create = function(node, iconSize) {
  return new Icon(node, iconSize);
};

Icon.loadByUrl = function(url, iconSize) {
  return getService('httpGet')(url)
    .then(function(response) {
      return new Icon(
        getService('nodeWrapper')('<div>').append(response.data).find('svg')[0],
        iconSize
      )
    }, function(response) {
      var
        message = typeof response == 'string'
          ? response
          : String(response.message || response.data || response.statusText);

      getService('log').warn(message);
      return getService('Promise').reject(message);
    });
};

Icon.prototype = {

  clone: function() {
    return this.node.cloneNode(true);
  }

};
