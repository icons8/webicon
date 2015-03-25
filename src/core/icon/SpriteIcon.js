'use strict';

di('SpriteIcon', function() {
  var
    AbstractCssClassIcon = di('AbstractCssClassIcon'),
    inherit = di('inherit')
    ;

  function SpriteIcon(className) {
    var
      SPRITE_ICON_CLASS = 'i8-sprite-icon';

    AbstractCssClassIcon.call(this, SPRITE_ICON_CLASS, className);
  }

  return inherit(SpriteIcon, AbstractCssClassIcon);

});