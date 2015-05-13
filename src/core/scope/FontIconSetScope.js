'use strict';

di('FontIconSetScope', function(injector) {
  var
    AbstractCssClassIconSetScope = injector('AbstractCssClassIconSetScope'),
    inherit = injector('inherit')
    ;

  function FontIconSetScope(id, cssClassResolver, options) {
    AbstractCssClassIconSetScope.call(this, id, cssClassResolver, options);
  }

  return inherit(FontIconSetScope, AbstractCssClassIconSetScope, {

    getIcon: function(iconId, params) {
      var
        FontIcon = injector('FontIcon');
      return new FontIcon(this._resolveCssClass(this._parseIconId(iconId, params), params));
    }

  });

});