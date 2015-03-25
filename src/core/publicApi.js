'use strict';

di('publicApi', function(di) {
  var 
    iconManager = di('iconManager');
  
  return {
    icon: function(id, urlConfig, iconSize) {
      iconManager.addIcon(id, urlConfig, iconSize);
      return this;
    },

    iconSet: function(id, urlConfig, iconSize) {
      iconManager.addSvgIconSet(id, urlConfig, iconSize);
      return this;
    },

    font: function(id, classConfig) {
      iconManager.addFontIconSet(id, classConfig);
      return this;
    },

    sprite: function(id, classConfig) {
      iconManager.addSpriteIconSet(id, classConfig);
      return this;
    },

    sourceAlias: function(id, alias) {
      iconManager.addIconSetAlias(id, alias);
      return this;
    },

    defaultIconSetUrl: function(url, iconSize) {
      iconManager
        .addSvgIconSet(url, url, iconSize)
        .setDefaultIconSet(url);
      return this;
    },

    defaultSource: function(id) {
      iconManager.setDefaultIconSet(id);
      return this;
    },

    defaultIconSize: function(iconSize) {
      iconManager.setDefaultIconSize(iconSize);
      return this;
    },

    preload: function() {
      iconManager.preload();
      return this;
    }

  };

});