'use strict';

di('AbstractRemoteSvgResourceScope', function(injector) {
  var
    AbstractRemoteResourceScope = injector('AbstractRemoteResourceScope'),
    inherit = injector('inherit'),
    parseSvgOptions = injector('parseSvgOptions')
  ;

  function AbstractRemoteSvgResourceScope(id, urlConfig, options) {
    var
      svgOptions = parseSvgOptions(options),
      self = this;

    AbstractRemoteResourceScope.call(this, id, urlConfig, options);

    Object.keys(svgOptions)
      .forEach(function(name) {
        self.options[name] = svgOptions[name];
      });
  }

  return inherit(AbstractRemoteSvgResourceScope, AbstractRemoteResourceScope);

});