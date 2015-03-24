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
    link: function (scope, element, attrs) {
      var
        FontIcon = service('FontIcon'),
        SvgIcon = service('SvgIcon'),
        expectElementAlt = service('expectElementAlt'),
        altAttrName = attrs.$normalize(attrs.$attr.alt || ''),
        attrName =  attrs.$normalize(attrs.$attr.icon || attrs.$attr.i8Icon || '')
        ;

      expectElementAlt(element, attrs[altAttrName] || attrs[attrName] || '');
      element.addClass('i8-icon');

      if (attrName) {
        attrs.$observe(attrName, function(icon) {
          elementEmpty();
          if (icon) {
            $i8Icon(icon).then(function(icon) {
              if (icon instanceof SvgIcon) {
                element.append(icon.clone());
              }
              if (icon instanceof FontIcon) {
                element.addClass(icon.className);
              }
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

