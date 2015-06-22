'use strict';

/**
 * @ngdoc module
 * @name webicon
 * @description
 * Icon
 */

angular.module('webicon', [])
  .config([
    '$provide',
    '$compileProvider',
    function($provide, $compileProvider) {
      var
        injector = createInjector(function(injector) {
          injector('angular', function() {
            return angular;
          })
        });
      $provide.provider('$webicon', injector('IconProvider'));
      $compileProvider.directive('webicon', injector('IconDirective'));
    }
  ])
  .run([
    '$webicon',
    function($webicon) {
      $webicon.$checkLazyPreload();
    }
  ])
;