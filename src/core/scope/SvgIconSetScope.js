'use strict';

di('SvgIconSetScope', function(di) {
  var
    AbstractRemoteSvgResourceScope = di('AbstractRemoteSvgResourceScope'),
    inherit = di('inherit')
    ;

  function SvgIconSetScope(id, urlConfig, svgOptions) {
    AbstractRemoteSvgResourceScope.call(this, id, urlConfig, svgOptions);
  }

  return inherit(SvgIconSetScope, AbstractRemoteSvgResourceScope, {

    _loadResource: function() {
      var
        SvgIconSet = di('SvgIconSet');
      return SvgIconSet.loadByUrl(this.urlResolver(), this.svgOptions);
    },

    hasIcon: function(iconId) {
      return this._getResource()
        .then(function(iconSet) {
          return iconSet.exists(iconId);
        })
    },

    getIcon: function(iconId) {
      var
        Promise = di('Promise');

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