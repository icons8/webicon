'use strict';

di('ImageIconScope', function(di) {
  var
    AbstractRemoteResourceScope = di('AbstractRemoteResourceScope'),
    inherit = di('inherit')
    ;

  function ImageIconScope(id, urlConfig, options) {
    AbstractRemoteResourceScope.call(this, id, urlConfig, options);
  }

  return inherit(ImageIconScope, AbstractRemoteResourceScope, {

    _loadResource: function() {
      var
        ImageIcon = di('ImageIcon');
      return ImageIcon.loadByUrl(this._resolveUrl());
    },

    hasIcon: function(iconId, params) {
      return this._parseIconId(iconId, params) == this._resolveIconId(this.id);
    },

    getIcon: function() {
      return this._getResource();
    }

  });

});