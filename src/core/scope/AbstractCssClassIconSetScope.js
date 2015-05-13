'use strict';

di('AbstractCssClassIconSetScope', function(injector) {
  var
    AbstractScope = injector('AbstractScope'),
    inherit = injector('inherit')
    ;

  function AbstractCssClassIconSetScope(id, cssClassResolver, options) {
    AbstractScope.call(this, id, options);

    this._classResolver = parseCssClassResolver(cssClassResolver);
  }

  return inherit(AbstractCssClassIconSetScope, AbstractScope, {

    _resolveCssClass: function(className, params) {
      return this._classResolver(className, params);
    }

  });

  function parseCssClassResolver(classResolver) {
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