'use strict';


/**
 * @ngdoc directive
 * @name i8Icon
 * @module i8.icon
 *
 * @restrict EA
 *
 * @description
 */

function IconDirective($i8Icon) {
  return {
    restrict: 'EA',
    scope: true,
    template: function(element, attrs) {
      return '';
    },
    link: function (scope, element, attrs) {
      var
        elementExpectAlt = service('elementExpectAlt'),
        altAttrName = attrs.$normalize(attrs.$attr.alt || ''),
        attrName =  attrs.$normalize(attrs.$attr.icon || attrs.$attr.i8Icon || '')
        ;

      elementExpectAlt(element, attrs[altAttrName] || attrs[attrName] || '');
      element.addClass('i8-icon');

      if (attrName) {
        attrs.$observe(attrName, function(icon) {
          elementEmpty();
          if (icon) {
            $i8Icon(icon).then(function(icon) {
              element.append(icon.clone());
            });
          }
        });
      }

      function elementEmpty() {
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }
    }
  };
}

IconDirective.$inject = [
  '$i8Icon'
];

