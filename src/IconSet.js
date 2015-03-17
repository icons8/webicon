'use strict';

function IconSet(element, iconSize) {
  var
    log = getService('log'),
    index,
    nodes,
    node,
    iconOptions = {
      iconSize: iconSize
    };

  this.icons = {};

  if (element.attr('viewBox')) {
    iconOptions.viewBox = element.attr('viewBox');
  }

  try {
    nodes = element[0].querySelectorAll('[id]');
    for(index = 0; index < nodes.length; index++) {
      node = nodes[index];
      this.icons[node.getAttribute('id')] = new Icon(node, iconOptions);
    }
  }
  catch(e) {
    log.warn(e);
  }

  this.iconSize = iconSize;
  this.viewBox = iconOptions.viewBox;
}

IconSet.loadByUrl = function(url, iconSize) {
  return svgLoader.loadByUrl(url)
    .then(function(element) {
      return new IconSet(
        element,
        iconSize
      )
    });
};

IconSet.prototype = {

  getIconById: function(id) {
    return this.icons.hasOwnProperty(id)
      ? this.icons[id]
      : null;
  },

  merge: function(iconSet) {
    var
      self = this,
      icons = iconSet.icons;

    Object.keys(icons)
      .forEach(function(id) {
        self.icons[id] = icons[id];
      });

  }

};
