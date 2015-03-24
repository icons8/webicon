'use strict';

di('renderIcon', function(di) {

  return function renderIcon(element, icon, cleaner) {
    var
      SVG_ICON_CLASS = 'i8-svg-icon',
      IMAGE_ICON_CLASS = 'i8-image-icon',
      FONT_ICON_CLASS = 'i8-font-icon',
      SPRITE_ICON_CLASS = 'i8-sprite-icon',
      SvgIcon = di('SvgIcon'),
      ImageIcon = di('ImageIcon'),
      FontIcon = di('FontIcon'),
      SpriteIcon = di('SpriteIcon'),
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

    if (icon instanceof FontIcon || icon instanceof SpriteIcon) {
      className = icon instanceof FontIcon
        ? FONT_ICON_CLASS
        : SPRITE_ICON_CLASS;

      classList = getClassList();
      element.addClass([icon.className, className].join(' '));
      classList = getAddedClassList(classList).concat(className);
      cleaner = function() {
        element.removeClass(classList.join(' '));
      };
    }

    return cleaner;

  }

});