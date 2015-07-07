'use strict';

di('publicApi', function(injector) {
  var 
    iconManager = injector('iconManager'),
    ready = injector('ready'),
    api;

  api = {
    icon: function(id, urlConfig, options) {
      iconManager.addIcon(id, urlConfig, options);
      return this;
    },

    svgSet: function(id, urlConfig, options) {
      iconManager.addSvgIconSet(id, urlConfig, options);
      return this;
    },

    font: function(id, cssClassConfig, options) {
      iconManager.addFontIconSet(id, cssClassConfig, options);
      return this;
    },

    sprite: function(id, cssClassConfig, options) {
      iconManager.addSpriteIconSet(id, cssClassConfig, options);
      return this;
    },

    sourceAlias: function(id, alias) {
      iconManager.addIconSetAlias(id, alias);
      return this;
    },

    defaultSvgSetUrl: function(url, options) {
      iconManager
        .addSvgIconSet(url, url, options)
        .setDefaultIconSet(url);
      return this;
    },

    defaultSource: function(id) {
      iconManager.setDefaultIconSet(id);
      return this;
    },

    defaultSvgIconSize: function(iconSize) {
      iconManager.setDefaultSvgIconSize(iconSize);
      return this;
    },

    preload: function(names, fn) {
      var
        promise;

      if (typeof names == 'function') {
        fn = names;
        names = null;
      }

      promise = iconManager.preload(names);
      fn && fn(promise);

      return this;
    },

    extension: ready

  };

  api.iconSet = api.svgSet;
  api.defaultIconSetUrl = api.defaultSvgSetUrl;
  api.defaultSvgIconSetUrl = api.defaultSvgSetUrl;
  api.alias = api.sourceAlias;
  api.default = api.defaultSource;

  return api;

});