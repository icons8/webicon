'use strict';

di('SvgIconScope', function(di) {
  var
    AbstractRemoteSvgResourceScope = di('AbstractRemoteSvgResourceScope'),
    inherit = di('inherit')
    ;

  function SvgIconScope(id, urlConfig, svgOptions) {
    AbstractRemoteSvgResourceScope.call(this, id, urlConfig, svgOptions);
  }

  return inherit(SvgIconScope, AbstractRemoteSvgResourceScope, {

    _loadResource: function() {
      var
        SvgIcon = di('SvgIcon');
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