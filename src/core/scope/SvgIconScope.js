'use strict';

di('SvgIconScope', function(injector) {
  var
    AbstractRemoteSvgResourceScope = injector('AbstractRemoteSvgResourceScope'),
    inherit = injector('inherit')
    ;

  function SvgIconScope(id, urlConfig, options) {
    AbstractRemoteSvgResourceScope.call(this, id, urlConfig, options);
  }

  return inherit(SvgIconScope, AbstractRemoteSvgResourceScope, {

    _loadResource: function() {
      var
        SvgIcon = injector('SvgIcon');
      return SvgIcon.loadByUrl(this._resolveUrl(), this.options);
    },

    hasIcon: function(iconId, params) {
      return this._parseIconId(iconId, params) == this._resolveIconId(this.id);
    },

    getIcon: function() {
      return this._getResource();
    }

  });

});