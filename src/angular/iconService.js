'use strict';

angular
  .module('i8.icon')
  .provider('$i8Icon', I8IconProvider);

/**
 * @ngdoc service
 * @name $i8IconProvider
 * @module i8.icon
 *
 * @description
 *
 * <hljs lang="js">
 * </hljs>
 *
 */

function I8IconProvider() {
}

I8IconProvider.prototype = {
  icon: function(id, url, iconSize) {
    iconManager.registerIcon(id, url, iconSize);
    return this;
  },

  iconSet : function(id, url, iconSize) {
    iconManager.registerIconSet(id, url, iconSize);
    return this;
  },

  defaultIconSetUrl : function(url, iconSize) {
    iconManager.registerIconSet(url, url, iconSize);
    iconManager.setDefaultIconSetId(url);
    return this;
  },

  defaultIconSetId : function(id) {
    iconManager.setDefaultIconSetId(id);
    return this;
  },

  $get : ['$injector', function($injector) {
    var
      service;

    registerProviders($injector);

    service = function(id) {
      return iconManager.getIcon(id);
    };
    service.preloadIcons = function() {
      iconManager.preloadIcons();
    };

    return service;

  }],

  defaultIconSize : function(iconSize) {
    iconManager.setDefaultIconSize(iconSize);
    return this;
  }
};
