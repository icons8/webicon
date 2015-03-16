'use strict';

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

    return parent.attr('aria-label')
      || parent.text()
      || parent.parent().attr('aria-label')
      || parent.parent().text()
      ;
  }

}
