'use strict';

di('AbstractCssClassIconSetScope', function(di) {
  var
    AbstractScope = di('AbstractScope'),
    inherit = di('inherit')
    ;

  function AbstractCssClassIconSetScope(id, classResolver) {

    AbstractScope.call(this, id);
    this.classResolver = parseClassResolver(classResolver);
  }

  return inherit(AbstractCssClassIconSetScope, AbstractScope);

  function parseClassResolver(classResolver) {
    var
      parts;
    if (typeof classResolver == 'function') {
      return classResolver;
    }
    classResolver = (classResolver || '') + '';

    parts = classResolver.split(/[?%]/);
    return function(id) {
      return parts.join(id);
    }
  }

});