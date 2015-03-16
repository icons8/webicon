'use strict';

function IconSet(iconSetNode, iconSize) {
  var
    index,
    nodes,
    node;

  this.icons = {};

  nodes = iconSetNode.querySelectorAll('[id]');
  for(index = 0; index < nodes.length; index++) {
    node = nodes[index];
    this.icons[node.getAttribute('id')] = node;
  }

  this.iconSize = iconSize;
}

IconSet.loadByUrl = function(url, iconSize) {
  return getService('httpGet')(url)
    .then(function(response) {
      return new IconSet(
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
        self.icons[id] = icons[is];
      });

  }

};
