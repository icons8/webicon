'use strict';


/**
 * @ngdoc service
 * @name $i8IconProvider
 * @module i8.icon
 *
 * @description
 *
 */

function IconProvider() {
}

IconProvider.prototype = {
  icon: function(id, url, iconSize) {
    var
      iconManager = di('iconManager');
    iconManager.addIcon(id, url, iconSize);
    return this;
  },

  image: function(id, url) {
    var
      iconManager = di('iconManager');
    iconManager.addImageIcon(id, url);
    return this;
  },

  iconSet: function(id, url, iconSize) {
    var
      iconManager = di('iconManager');
    iconManager.addSvgIconSet(id, url, iconSize);
    return this;
  },

  defaultIconSetUrl: function(url, iconSize) {
    var
      iconManager = di('iconManager');

    iconManager.addSvgIconSet(url, url, iconSize);
    iconManager.setDefaultIconSet(url);
    return this;
  },

  defaultIconSetId: function(id) {
    var
      iconManager = di('iconManager');
    iconManager.setDefaultIconSet(id);
    return this;
  },

  defaultIconSize: function(iconSize) {
    var
      iconManager = di('iconManager');
    iconManager.setDefaultIconSize(iconSize);
    return this;
  },

  $get: ['$injector', function($injector) {
    var
      iconManager = di('iconManager'),
      registerDependencies = di('registerDependencies'),
      iconService;

    registerDependencies($injector);

    iconService = function(id) {
      return iconManager.getIcon(id);
    };
    iconService.preLoad = function() {
      iconManager.preLoad();
    };

    return iconService;
  }]

};

