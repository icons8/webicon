'use strict';

di('FontIcon', function(injector) {
  var
    AbstractCssClassIcon = injector('AbstractCssClassIcon'),
    inherit = injector('inherit')
    ;

  function FontIcon(className) {
    var
      FONT_ICON_CLASS = 'i8-font-icon';

    AbstractCssClassIcon.call(this, FONT_ICON_CLASS, className);
  }

  return inherit(FontIcon, AbstractCssClassIcon);

});