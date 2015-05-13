'use strict';

di('SpriteIconSetScope', function(injector) {
  var
    AbstractCssClassIconSetScope = injector('AbstractCssClassIconSetScope'),
    inherit = injector('inherit')
    ;

  function SpriteIconSetScope(id, classResolver, options) {
    AbstractCssClassIconSetScope.call(this, id, classResolver, options);
  }

  return inherit(SpriteIconSetScope, AbstractCssClassIconSetScope, {

    getIcon: function(iconId, params) {
      var
        SpriteIcon = injector('SpriteIcon');
      return new SpriteIcon(this._resolveCssClass(this._parseIconId(iconId, params), params));
    }

  });

});