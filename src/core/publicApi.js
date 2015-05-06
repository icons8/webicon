'use strict';

di('publicApi', function(di) {
  var 
    iconManager = di('iconManager'),
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

    defaultSvgIconSetUrl: function(url, options) {
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
      iconManager.setDefaultIconSize(iconSize);
      return this;
    },

    preload: function() {
      iconManager.preload();
      return this;
    }

  };

  api.iconSet = api.svgSet;
  api.defaultIconSetUrl = api.defaultSvgIconSetUrl;
  api.alias = api.sourceAlias;
  api.default = api.defaultSource;

  return api;

});