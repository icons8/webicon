'use strict';

di('renderIcon', function(di) {

  return function renderIcon(element, icon, cleaner) {
    var
      SVG_ICON_CLASS = 'i8-svg-icon',
      FONT_ICON_CLASS = 'i8-font-icon',
      SvgIcon = di('SvgIcon'),
      FontIcon = di('FontIcon'),
      nodeWrapper = di('nodeWrapper'),
      classList,
      noop = function() {}
    ;

    element = nodeWrapper(element);

    function getClassList() {
      return element
        .attr('class')
        .split(/\s+/);
    }

    function getAddedClassList(classList) {
      var
        currClassList = getClassList();
      classList = classList || [];
      return currClassList.filter(function(className) {
        return classList.indexOf(className) == -1;
      });
    }

    cleaner && cleaner();
    cleaner = noop;

    if (icon instanceof SvgIcon) {
      element.append(icon.clone());
      element.addClass(SVG_ICON_CLASS);
      cleaner = function() {
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
        element.removeClass(SVG_ICON_CLASS);
      };
    }
    if (icon instanceof FontIcon) {
      classList = getClassList();
      element.addClass([icon.className, FONT_ICON_CLASS].join(' '));
      classList = getAddedClassList(classList).concat(FONT_ICON_CLASS);
      cleaner = function() {
        element.removeClass(classList.join(' '));
      };
    }

    return cleaner;

  }

});