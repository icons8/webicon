'use strict';

di('SvgIconSetScope', function(di) {
  var
    AbstractRemoteSvgResourceScope = di('AbstractRemoteSvgResourceScope'),
    inherit = di('inherit')
    ;

  function SvgIconSetScope(id, urlConfig, options) {
    AbstractRemoteSvgResourceScope.call(this, id, urlConfig, options);
  }

  return inherit(SvgIconSetScope, AbstractRemoteSvgResourceScope, {

    _loadResource: function() {
      var
        SvgIconSet = di('SvgIconSet');
      return SvgIconSet.loadByUrl(this._resolveUrl(), this.options);
    },

    hasIcon: function(iconId, params) {
      iconId = this._parseIconId(iconId, params);

      return this._getResource()
        .then(function(iconSet) {
          return iconSet.exists(iconId);
        })
    },

    getIcon: function(iconId, params) {
      var
        Promise = di('Promise');

      iconId = this._parseIconId(iconId, params);
      return this._getResource()
        .then(function(iconSet) {
          var
            icon = iconSet.getIconById(iconId);
          return icon
            ? icon
            : Promise.reject();
        })
    }

  });

});