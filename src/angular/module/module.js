'use strict';

/**
 * @ngdoc module
 * @name i8.icon
 * @description
 * Icon
 */
angular.module('i8.icon', [])
  .provider('$i8Icon', IconProvider)
  .directive('i8Icon', IconDirective)
;

angular.module('i8.icon')
  .run([
    '$i8Icon',
    function($i8Icon) {
      $i8Icon.$checkLazyPreload();
    }
  ])
;

ready();