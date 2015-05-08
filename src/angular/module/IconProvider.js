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
  var
    lazyPreload = false;

  this.preload = function() {
    lazyPreload = true;
    return this;
  };

  this.$get = ['$injector', function($injector) {
    var
      iconManager = di('iconManager'),
      ensureDependenciesRegistered = di('ensureDependenciesRegistered'),
      iconService;

    ensureDependenciesRegistered($injector);

    iconService = function(id) {
      return iconManager.getIcon(id);
    };
    iconService.preload = function() {
      iconManager.preload();
    };

    iconService.$checkLazyPreload = function() {
      if (lazyPreload) {
        this.preload();
      }
    };

    return iconService;
  }];

}

IconProvider.prototype = di('publicApi');

