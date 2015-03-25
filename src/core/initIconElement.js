'use strict';

di('initIconElement', function(di) {

  return function initIconElement(element, alt) {
    var
      ICON_CLASS = 'i8-icon',
      expectAlt = di('expectAlt');

    expectAlt(element, alt || '');
    if (!element.hasClass(ICON_CLASS)) {
      element.addClass(ICON_CLASS);
    }
  }

});