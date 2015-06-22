'use strict';

di('initIconElement', function(injector) {

  return function initIconElement(element, alt, icon) {
    var
      ICON_CLASS = 'webicon',
      pieces
      ;

    if (!alt && typeof alt != 'string') {
      icon = String(icon || '')
        .split(':')
        .slice(-1)[0]
        .trim();

      if (/[/\\.]/.test(icon)) {
        pieces = icon
          .split(/[/\\]/)
          .slice(-1)[0]
          .split('.');

        if (pieces.length > 1) {
          pieces = pieces
            .slice(0, -1);
        }
        alt = pieces
          .join('.');
      }
      else {
        alt = icon
          .split(/\s/)
          [0];
      }

    }

    expectAlt(element, alt || '');
    if (!element.hasClass(ICON_CLASS)) {
      element.addClass(ICON_CLASS);
    }
  };

  function expectAlt(element, alt) {

    if (alt != '' && !parentsHaveText()) {
      expectAria('aria-label', alt);
      expectAria('role', 'img');
    }
    else {
      expectAria('aria-hidden', 'true');
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
          children,
          index,
          child;

        if (hasChildren) {
          children = node.childNodes;
          for(index = 0; index < children.length; index++){
            child = children[index];
            if(child.nodeType === 1 && child.hasAttribute(attrName) && !isHidden(child)) {
              return true;
            }
          }
        }
        return false;

        function isHidden(node) {
          var
            style = node.currentStyle
              ? node.currentStyle
              : window.getComputedStyle(node);
          return style.display === 'none';
        }
      }
    }

    function parentsHaveText() {
      var
        parent = element.parent();

      if (parent.attr('aria-label') || parent.text().trim()) {
        return true;
      }
      if (parent.prop('tagName') != 'BODY') {
        if (parent.parent().attr('aria-label') || parent.parent().text().trim()) {
          return true;
        }
      }
      return false;
    }

  }

});