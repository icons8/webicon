'use strict';

service('SvgIconScope', function(service) {
  var
    AbstractRemoteSvgResourceScope = service('AbstractRemoteSvgResourceScope'),
    inherit = service('inherit')
    ;

  function SvgIconScope(id, urlConfig, svgOptions) {
    AbstractRemoteSvgResourceScope.call(this, id, urlConfig, svgOptions);
  }

  return inherit(SvgIconScope, AbstractRemoteSvgResourceScope, {

    _loadResource: function() {
      var
        SvgIcon = service('SvgIcon');
      return SvgIcon.loadByUrl(this.urlResolver(), this.svgOptions);
    },

    hasIcon: function(iconId) {
      return iconId == this.id;
    },

    getIcon: function() {
      return this._getResource();
    }

  });

});