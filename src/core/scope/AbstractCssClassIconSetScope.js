'use strict';

di('AbstractCssClassIconSetScope', function(di) {
  var
    AbstractScope = di('AbstractScope'),
    inherit = di('inherit')
    ;

  function AbstractCssClassIconSetScope(id, classResolver) {

    AbstractScope.call(this, id);

    this.classResolver = typeof classResolver == 'function'
      ? classResolver
      : function() { return classResolver; };
  }

  return inherit(AbstractCssClassIconSetScope, AbstractScope);

});