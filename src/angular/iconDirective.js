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
 * @restrict E
 *
 * @description
 * i8Icon
 */

function i8IconDirective($window, $i8Icon) {
  return {
    restrict: 'EA',
    scope: {
      icon: '@',
      src: '@'
    },
    link: postLink
  };

  /**
   * Directive postLink
   */
  function postLink(scope, element, attr) {

    var ariaLabel = attr.alt || scope.icon;
    var attrName = attr.$normalize(attr.$attr.icon || attr.$attr.src || '');

    if (attr.alt != '' && !parentsHaveText()) {
      ariaExpect(element, 'aria-label', ariaLabel);
      ariaExpect(element, 'role', 'img');
    } else {
      ariaExpect(element, 'aria-hidden', 'true');
    }

    if (attrName) {
      // Use either pre-configured SVG or URL source, respectively.
      attr.$observe(attrName, function(attrVal) {

        element.empty();
        if (attrVal) {
          $i8Icon(attrVal).then(function(svg) {
            element.append(svg);
          });
        }

      });
    }


    function ariaExpect(element, attrName, defaultValue) {
      var node = element[0];

      if (!node.hasAttribute(attrName) && !childHasAttribute(node, attrName)) {

        defaultValue = (typeof defaultValue == 'string') ? defaultValue.trim() : '';
        if (defaultValue.length) {
          element.attr(attrName, defaultValue);
        }

      }

      function childHasAttribute(node, attrName) {
        var hasChildren = node.hasChildNodes(),
          hasAttr = false;

        function isHidden(el) {
          var style = el.currentStyle ? el.currentStyle : $window.getComputedStyle(el);
          return (style.display === 'none');
        }

        if(hasChildren) {
          var children = node.childNodes;
          for(var i = 0; i < children.length; i++){
            var child = children[i];
            if(child.nodeType === 1 && child.hasAttribute(attrName)) {
              if(!isHidden(child)){
                hasAttr = true;
              }
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

}

i8IconDirective.$inject = [
  '$window',
  '$i8Icon'
];