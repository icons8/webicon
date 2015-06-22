'use strict';

di('IconDirective', function(injector) {

  /**
   * @ngdoc directive
   * @name webicon
   * @module webicon
   *
   * @restrict EA
   *
   * @description
   */

  function IconDirective($webicon) {
    return {
      restrict: 'EA',
      scope: true,
      link: function (scope, element, attrs) {
        var
          initIconElement = injector('initIconElement'),
          altAttrName = attrs.$normalize(attrs.$attr.alt || ''),
          alt,
          attrName =  attrs.$normalize(attrs.$attr.icon || attrs.$attr.webicon || ''),
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
              $webicon(icon).then(function(icon) {
                cleaner = icon.render(element);
              });
            }
          });
        }

      }
    };
  }

  IconDirective.$inject = [
    '$webicon'
  ];

  return IconDirective;

});


