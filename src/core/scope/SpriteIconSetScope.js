'use strict';

di('SpriteIconSetScope', function(di) {
  var
    AbstractCssClassIconSetScope = di('AbstractCssClassIconSetScope'),
    inherit = di('inherit')
    ;

  function SpriteIconSetScope(id, classResolver, options) {
    AbstractCssClassIconSetScope.call(this, id, classResolver, options);
  }

  return inherit(SpriteIconSetScope, AbstractCssClassIconSetScope, {

    getIcon: function(iconId, params) {
      var
        SpriteIcon = di('SpriteIcon');
      return new SpriteIcon(this._resolveCssClass(this._parseIconId(iconId, params), params));
    }

  });

});