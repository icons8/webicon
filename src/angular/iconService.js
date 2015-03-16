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

function I8IconProvider() { }

I8IconProvider.prototype = {
  icon: function(id, url, iconSize) {
    ensureProvidersRegistered();
    iconManager.registerIcon(id, url, iconSize);
    return this;
  },

  iconSet : function(id, url, iconSize) {
    ensureProvidersRegistered();
    iconManager.registerIconSet(id, url, iconSize);
    return this;
  },

  defaultIconSetUrl : function(url, iconSize) {
    ensureProvidersRegistered();
    iconManager.registerIconSet(url, url, iconSize);
    iconManager.setDefaultIconSetId(url);
    return this;
  },

  defaultIconSetId : function(id) {
    ensureProvidersRegistered();
    iconManager.setDefaultIconSetId(id);
    return this;
  },

  defaultIconSize : function(iconSize) {
    ensureProvidersRegistered();
    iconManager.setDefaultIconSize(iconSize);
    return this;
  },

  preloadIcons: function() {
    ensureProvidersRegistered();
    iconManager.preloadIcons();
    return this;
  },

  $get : [function() {
    ensureProvidersRegistered();
    return function(id) {
      iconManager.getIcon(id);
    };
  }]
};
