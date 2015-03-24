'use strict';

service('FontIconSetScope', function(service) {
  var
    AbstractScope = service('AbstractScope'),
    inherit = service('inherit')
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
        FontIcon = service('FontIcon');
      return new FontIcon(this.classResolver(iconId));
    }

  });

});