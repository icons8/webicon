'use strict';

di('IconProvider', function(injector) {

  /**
   * @ngdoc service
   * @name $webiconProvider
   * @module webicon
   *
   * @description
   *
   */

  function IconProvider() {
    var
      lazyPreload = [];

    this.preload = function() {
      lazyPreload.push(
        Array.prototype.slice.call(arguments)
      );
      return this;
    };

    this.$get = ['$injector', function($injector) {
      var
        iconManager = injector('iconManager'),
        ensureDependenciesRegistered = injector('ensureDependenciesRegistered'),
        iconService;

      ensureDependenciesRegistered($injector);

      iconService = function(id) {
        return iconManager.getIcon(id);
      };
      iconService.preload = function(names, fn) {
        var
          promise;

        if (typeof names == 'function' || (Array.isArray(names) && typeof names.slice(-1)[0] == 'function')) {
          fn = names;
          names = null;
        }

        promise = iconManager.preload(names);
        if (fn) {
          $injector.invoke(fn, null, {
            $preloadPromise: promise,
            $preloadIconSetPromises: promise.iconSets
          });
        }
        return promise;
      };

      iconService.$checkLazyPreload = function() {
        var
          self = this;

        if (lazyPreload.length) {
          lazyPreload.forEach(function(args) {
            self.preload.apply(
              self,
              args
            );
          });
        }
      };

      return iconService;
    }];

  }

  IconProvider.prototype = injector('publicApi');

  return IconProvider;
});

