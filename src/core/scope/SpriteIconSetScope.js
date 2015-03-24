'use strict';

di('SpriteIconSetScope', function(di) {
  var
    AbstractCssClassIconSetScope = di('AbstractCssClassIconSetScope'),
    inherit = di('inherit')
    ;

  function SpriteIconSetScope(id, classResolver) {
    AbstractCssClassIconSetScope.call(this, id, classResolver);
  }

  return inherit(SpriteIconSetScope, AbstractCssClassIconSetScope, {

    getIcon: function(iconId) {
      var
        SpriteIcon = di('SpriteIcon');
      return new SpriteIcon(this.classResolver(iconId));
    }

  });

});