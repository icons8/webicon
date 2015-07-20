'use strict';

function weLoveSvgExtension(di, config) {
  var
    iconManager = di('iconManager'),
    iconIdFilter,
    materialDesignIconIdResolver,
    makiIconIdResolver,
    options,
    svgSets;

  iconIdFilter = function(id) {
    return String(id || '')
      .replace(/_/g, '-');
  };

  materialDesignIconIdResolver = function(id) {
    return iconIdFilter(id)
      .replace(/^ic-/, '')
      .replace(/-\d+px$/, '');
  };

  makiIconIdResolver = function(id) {
    return iconIdFilter(id)
      .replace(/-\d+$/, '');
  };

  options = {
    iconIdResolver: iconIdFilter,
    iconIdParser: iconIdFilter,
    preloadable: false
  };

  function addSvgIconSet(name, url) {
    var
      opts;

    switch(name) {
      case 'maki':
        opts = copy(options, { iconIdResolver: makiIconIdResolver });
        break;

      case 'material-design-icons':
        opts = copy(options, { iconIdResolver: materialDesignIconIdResolver });
        break;

      default:
        opts = copy(options);
    }

    iconManager.addSvgIconSet(name, url, opts)
  }

  svgSets = config.svgSets;
  svgSets.libs.forEach(function(name) {
    var
      lib,
      filename;

    if (typeof name == 'object') {
      lib = name.lib;
      filename = name.filename || (name.name || lib) + '.svg';
      name = name.name || lib;
    }
    else {
      lib = name;
      filename = name + '.svg';
    }

    addSvgIconSet(
      name,
      [svgSets.url, lib, filename].join('/')
    );
  });

  Object.keys(config.libs || {}).forEach(function(name) {
    addSvgIconSet(name, config.libs[name]);
  });

  Object.keys(config.aliases || {}).forEach(function(alias) {
    iconManager.addIconSetAlias(
      config.aliases[alias],
      alias
    )
  });

  function copy(/* ...objects */) {
    var
      result = {};

    Array.prototype.slice.call(arguments).forEach(function(object) {
      if (object) {
        Object.keys(object).forEach(function(key) {
          result[key] = object[key];
        });
      }
    });

    return result;
  }

}