'use strict';

service('initIconElement', function(service) {

  return function initIconElement(element, alt) {
    var
      ICON_CLASS = 'i8-icon',
      nodeWrapper = service('nodeWrapper'),
      expectAlt = service('expectAlt');

    element = nodeWrapper(element);

    expectAlt(element, alt || '');
    if (!element.hasClass(ICON_CLASS)) {
      element.addClass(ICON_CLASS);
    }
  }

});