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
      iconManager = service('iconManager');
    iconManager.registerIcon(id, url, iconSize);
    return this;
  },

  iconSet: function(id, url, iconSize) {
    var
      iconManager = service('iconManager');
    iconManager.registerIconSet(id, url, iconSize);
    return this;
  },

  defaultIconSetUrl: function(url, iconSize) {
    var
      iconManager = service('iconManager');

    iconManager.registerIconSet(url, url, iconSize);
    iconManager.setDefaultIconSetId(url);
    return this;
  },

  defaultIconSetId: function(id) {
    var
      iconManager = service('iconManager');
    iconManager.setDefaultIconSetId(id);
    return this;
  },

  defaultIconSize: function(iconSize) {
    var
      iconManager = service('iconManager');
    iconManager.setDefaultIconSize(iconSize);
    return this;
  },

  $get: ['$injector', function($injector) {
    var
      iconManager = service('iconManager'),
      registerProviders = service('registerProviders'),
      iconService;

    registerProviders($injector);

    iconService = function(id) {
      return iconManager.getIcon(id);
    };
    iconService.preload = function() {
      iconManager.preload();
    };

    return iconService;
  }]

};

