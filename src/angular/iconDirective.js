'use strict';

angular
  .module('i8.icon')
  .directive('i8Icon', i8IconDirective);

/**
 * @ngdoc directive
 * @name i8Icon
 * @module i8.icon
 *
 * @restrict EA
 *
 * @description
 */

function i8IconDirective($i8Icon) {
  return {
    restrict: 'EA',
    scope: true,
    template: function(element, attrs) {
      return '';
    },
    link: function (scope, element, attrs) {
      var
        attrName =  attrs.$normalize(attrs.$attr.icon || attrs.$attr.i8Icon || '')
        ;

      expectAlt(element, attrs.alt || attrs[attrName] || '');

      if (attrName) {
        attrs.$observe(attrName, function(icon) {
          element.empty();
          if (icon) {
            $i8Icon(icon).then(function(icon) {
              element.append(icon.clone());
            });
          }
        });
      }


    }
  };
}

i8IconDirective.$inject = [
  '$i8Icon'
];