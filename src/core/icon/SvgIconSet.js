'use strict';

di('SvgIconSet', function(di) {

  function SvgIconSet(element, options) {
    var
      log = di('log'),
      parseSvgOptions = di('parseSvgOptions'),
      SvgIcon = di('SvgIcon'),
      index,
      nodes,
      node,
      iconSize,
      viewBox
      ;

    options = parseSvgOptions(options);

    this.icons = {};

    viewBox = options.viewBox || element[0].getAttribute('viewBox');
    iconSize = options.iconSize;

    try {
      nodes = element[0].querySelectorAll('[id]');
      for(index = 0; index < nodes.length; index++) {
        node = nodes[index];
        this.icons[node.getAttribute('id')] = new SvgIcon(node, {
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

  SvgIconSet.loadByUrl = function(url, options) {
    var
      loadSvgByUrl = di('loadSvgByUrl');

    return loadSvgByUrl(url)
      .then(function(element) {
        return new SvgIconSet(
          element,
          options
        )
      });
  };

  SvgIconSet.prototype = {

    notExists: function(ids) {
      var
        icons = this.icons;
      return ids.filter(function(id) {
        return !icons.hasOwnProperty(id);
      });
    },

    exists: function(id) {
      return this.icons.hasOwnProperty(id);
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

      return SvgIconSet.loadByUrl(url, options)
        .then(function(iconSet) {
          return self.merge(iconSet);
        })
    }

  };

  return SvgIconSet;

});

