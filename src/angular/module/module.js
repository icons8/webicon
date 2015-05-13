'use strict';

/**
 * @ngdoc module
 * @name i8.icon
 * @description
 * Icon
 */

angular.module('i8.icon', [])
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
      $provide.provider('$i8Icon', injector('IconProvider'));
      $compileProvider.directive('i8Icon', injector('IconDirective'));
    }
  ])
  .run([
    '$i8Icon',
    function($i8Icon) {
      $i8Icon.$checkLazyPreload();
    }
  ])
;