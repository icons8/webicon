'use strict';

service('SvgIconSetScope', function(service) {
  var
    AbstractRemoteSvgResourceScope = service('AbstractRemoteSvgResourceScope'),
    inherit = service('inherit')
    ;

  function SvgIconSetScope(id, urlConfig, svgOptions) {
    AbstractRemoteSvgResourceScope.call(this, id, urlConfig, svgOptions);
  }

  return inherit(SvgIconSetScope, AbstractRemoteSvgResourceScope, {

    _loadResource: function() {
      var
        SvgIconSet = service('SvgIconSet');
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
        Promise = service('Promise');

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