'use strict';

di('ImageIconScope', function(di) {
  var
    AbstractRemoteResourceScope = di('AbstractRemoteResourceScope'),
    inherit = di('inherit')
    ;

  function ImageIconScope(id, urlConfig) {
    AbstractRemoteResourceScope.call(this, id, urlConfig);
  }

  return inherit(ImageIconScope, AbstractRemoteResourceScope, {

    _loadResource: function() {
      var
        ImageIcon = di('ImageIcon');
      return ImageIcon.loadByUrl(this.urlResolver());
    },

    hasIcon: function(iconId) {
      return iconId == this.id;
    },

    getIcon: function() {
      return this._getResource();
    }

  });

});