'use strict';

di('renderIcon', function(di) {

  return function renderIcon(element, icon, cleaner) {
    var
      SVG_ICON_CLASS = 'i8-svg-icon',
      IMAGE_ICON_CLASS = 'i8-image-icon',
      FONT_ICON_CLASS = 'i8-font-icon',
      SvgIcon = di('SvgIcon'),
      ImageIcon = di('ImageIcon'),
      FontIcon = di('FontIcon'),
      nodeWrapper = di('nodeWrapper'),
      className,
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

    if (icon instanceof SvgIcon || icon instanceof ImageIcon) {
      className = icon instanceof SvgIcon
        ? SVG_ICON_CLASS
        : IMAGE_ICON_CLASS;

      element.append(icon.clone());
      element.addClass(className);
      cleaner = function() {
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
        element.removeClass(className);
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