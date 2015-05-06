'use strict';

di('AbstractRemoteSvgResourceScope', function(di) {
  var
    AbstractRemoteResourceScope = di('AbstractRemoteResourceScope'),
    inherit = di('inherit'),
    parseSvgOptions = di('parseSvgOptions')
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