'use strict';

/**
 * @ngdoc module
 * @name i8.icon
 * @description
 * Icon
 */
angular.module('i8.icon', [])
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

function i8IconDirective($window, $i8Icon) {
  return {
    restrict: 'EA',
    scope: true,
    template: function(element, attrs) {
      return '';
    },
    link: function (scope, element, attrs) {
      var
        attrIconName =  attrs.$attr.icon || attrs.$normalize(attrs.$attr.i8Icon) || '',
        attrSrcName = attrs.$attr.src
        ;

      expectAlt(attrs.alt || attrs[attrIconName] || '');

      if (attrSrcName) {
        attrs.$observe(attrSrcName, function(icon) {
          element.empty();
          if (icon) {
            $i8Icon.getIconByUrl(icon).then(function(xml) {
              element.append(xml);
            });
          }
        });
      }
      else if (attrIconName) {
        attrs.$observe(attrIconName, function(icon) {
          element.empty();
          if (icon) {
            $i8Icon.getIconById(icon).then(function(xml) {
              element.append(xml);
            });
          }
        });
      }

      function expectAlt(alt) {
        if (alt != '' && !parentsHaveText()) {
          expectAria('aria-label', alt);
          expectAria('role', 'img');
        } else {
          expectAria('aria-hidden', 'true');
        }
      }

      function expectAria(attrName, defaultValue) {
        var
          node = element[0];

        if (!node.hasAttribute(attrName) && !childHasAttribute(node, attrName)) {
          defaultValue = (typeof defaultValue == 'string') ? defaultValue.trim() : '';
          if (defaultValue.length) {
            element.attr(attrName, defaultValue);
          }
        }

        function childHasAttribute(node, attrName) {
          var
            hasChildren = node.hasChildNodes(),
            hasAttr = false,
            children,
            i,
            child;

          function isHidden(el) {
            var
              style = el.currentStyle
                ? el.currentStyle
                : $window.getComputedStyle(el);
            return style.display === 'none';
          }

          if(hasChildren) {
            children = node.childNodes;
            for(i = 0; i < children.length; i++){
              child = children[i];
              if(child.nodeType === 1 && child.hasAttribute(attrName) && !isHidden(child)) {
                hasAttr = true;
              }
            }
          }
          return hasAttr;
        }
      }

      function parentsHaveText() {
        var parent = element.parent();
        if (parent.attr('aria-label') || parent.text()) {
          return true;
        }
        else if(parent.parent().attr('aria-label') || parent.parent().text()) {
          return true;
        }
        return false;
      }
    }
  };



}

i8IconDirective.$inject = [
  '$window',
  '$i8Icon'
];