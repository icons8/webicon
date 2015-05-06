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
        initIconElement = di('initIconElement'),
        altAttrName = attrs.$normalize(attrs.$attr.alt || ''),
        alt,
        attrName =  attrs.$normalize(attrs.$attr.icon || attrs.$attr.i8Icon || ''),
        cleaner = null
        ;

      alt = altAttrName
        ? attrs[altAttrName]
        : null;

      initIconElement(element, alt, attrs[attrName]);

      if (attrName) {
        attrs.$observe(attrName, function(icon) {
          cleaner && cleaner();
          cleaner = null;
          if (icon) {
            $i8Icon(icon).then(function(icon) {
              cleaner = icon.render(element);
            });
          }
        });
      }

    }
  };
}

IconDirective.$inject = [
  '$i8Icon'
];

