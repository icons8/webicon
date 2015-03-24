'use strict';

di('FontIconSetScope', function(di) {
  var
    AbstractScope = di('AbstractScope'),
    inherit = di('inherit')
    ;

  function FontIconSetScope(id, classResolver) {

    AbstractScope.call(this, id);

    this.classResolver = typeof classResolver == 'function'
      ? classResolver
      : function() { return classResolver; };
  }

  return inherit(FontIconSetScope, AbstractScope, {

    getIcon: function(iconId) {
      var
        FontIcon = di('FontIcon');
      return new FontIcon(this.classResolver(iconId));
    }

  });

});