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

ready();