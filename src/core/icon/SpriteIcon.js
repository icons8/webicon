'use strict';

di('SpriteIcon', function(injector) {
  var
    AbstractCssClassIcon = injector('AbstractCssClassIcon'),
    inherit = injector('inherit')
    ;

  function SpriteIcon(className) {
    var
      SPRITE_ICON_CLASS = 'sprite-webicon';

    AbstractCssClassIcon.call(this, SPRITE_ICON_CLASS, className);
  }

  return inherit(SpriteIcon, AbstractCssClassIcon);

});