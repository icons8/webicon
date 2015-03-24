'use strict';

di('AbstractRemoteSvgResourceScope', function(di) {
  var
    AbstractRemoteResourceScope = di('AbstractRemoteResourceScope'),
    inherit = di('inherit')
  ;

  function AbstractRemoteSvgResourceScope(id, urlConfig, svgOptions) {
    var
      parseSvgOptions = di('parseSvgOptions');

    AbstractRemoteResourceScope.call(this, id, urlConfig);

    this.svgOptions = parseSvgOptions(svgOptions);
  }

  return inherit(AbstractRemoteSvgResourceScope, AbstractRemoteResourceScope);

});