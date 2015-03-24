'use strict';

di('initIconElement', function(di) {

  return function initIconElement(element, alt) {
    var
      ICON_CLASS = 'i8-icon',
      nodeWrapper = di('nodeWrapper'),
      expectAlt = di('expectAlt');

    element = nodeWrapper(element);

    expectAlt(element, alt || '');
    if (!element.hasClass(ICON_CLASS)) {
      element.addClass(ICON_CLASS);
    }
  }

});