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

  this.$get = ['$injector', function($injector) {
    var
      iconManager = di('iconManager'),
      registerDependencies = di('registerDependencies'),
      iconService;

    registerDependencies($injector);

    iconService = function(id) {
      return iconManager.getIcon(id);
    };
    iconService.preload = function() {
      iconManager.preload();
    };

    return iconService;
  }];

}

IconProvider.prototype = di('publicApi');

