'use strict';

function IconSet(element, options) {
  var
    log = getService('log'),
    index,
    nodes,
    node,
    iconSize = null,
    viewBox = null
    ;

  if (options) {
    switch(typeof options) {
      case 'number':
        iconSize = options;
        break;
      case 'string':
        viewBox = options;
        break;
      default:
        iconSize = options.iconSize || iconSize;
        viewBox = options.viewBox || viewBox;
    }
  }

  this.icons = {};

  viewBox = viewBox || element[0].getAttribute('viewBox');

  try {
    nodes = element[0].querySelectorAll('[id]');
    for(index = 0; index < nodes.length; index++) {
      node = nodes[index];
      this.icons[node.getAttribute('id')] = new Icon(node, {
        iconSize: iconSize,
        viewBox: viewBox
      });
    }
  }
  catch(e) {
    log.warn(e);
  }

  this.iconSize = iconSize;
  this.viewBox = viewBox;
}

IconSet.loadByUrl = function(url, options) {
  return svgLoader.loadByUrl(url)
    .then(function(element) {
      return new IconSet(
        element,
        options
      )
    });
};

IconSet.prototype = {

  notExists: function(ids) {
    var
      icons = this.icons;
    return ids.filter(function(id) {
      return !icons.hasOwnProperty(id);
    });
  },

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

    return this;
  },

  mergeByUrl: function(url, options) {
    var
      self = this;

    return IconSet.loadByUrl(url, options)
      .then(function(iconSet) {
        return self.merge(iconSet);
      })
  },

  addIconByUrl: function(id, url) {
    var
      self = this;
    return Icon.loadByUrl(url, { iconSize: this.iconSize, viewBox: this.viewBox })
      .then(function(icon) {
        self.icons[id] = icon;
        return icon;
      });
  }

};
