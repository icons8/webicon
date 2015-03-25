'use strict';

di('FontIconSetScope', function(di) {
  var
    AbstractCssClassIconSetScope = di('AbstractCssClassIconSetScope'),
    inherit = di('inherit')
    ;

  function FontIconSetScope(id, classResolver) {
    AbstractCssClassIconSetScope.call(this, id, classResolver);
  }

  return inherit(FontIconSetScope, AbstractCssClassIconSetScope, {

    getIcon: function(iconId, params) {
      var
        FontIcon = di('FontIcon');
      return new FontIcon(this.classResolver(iconId, params));
    }

  });

});