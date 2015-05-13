'use strict';

di('SvgCumulativeIconSetScope', function(injector) {
  var
    AbstractRemoteSvgResourceScope = injector('AbstractRemoteSvgResourceScope'),
    inherit = injector('inherit')
    ;

  function SvgCumulativeIconSetScope(id, urlConfig, options) {
    var
      DEFAULT_WAIT_DURATION = 10;

    AbstractRemoteSvgResourceScope.call(this, id, urlConfig, options);

    this.waitDuration = this.options.waitDuration || DEFAULT_WAIT_DURATION;
    this.waitPromise = null;
    this.waitIconIds = [];
  }

  return inherit(SvgCumulativeIconSetScope, AbstractRemoteSvgResourceScope, {

    _loadResource: function() {
      var
        SvgIconSet = injector('SvgIconSet');
      return SvgIconSet.loadByUrl(this._resolveUrl(this.waitIconIds), this.options);
    },

    preload: function() {
      return true;
    },

    getIcon: function(iconId, params) {
      var
        Promise = injector('Promise'),
        timeout = injector('timeout'),
        self = this;

      iconId = this._parseIconId(iconId, params);

      if (this._resource && this._resource.exists(iconId)) {
        return Promise.resolve(this._resource.getIconById(iconId));
      }

      if (this.waitPromise) {
        if (this.waitIconIds.indexOf(iconId) == -1) {
          this.waitIconIds.push(iconId);
        }
      }
      else {
        this.waitIconIds = [iconId];
        this.waitPromise = timeout(this.waitDuration).then(function() {
          self.waitPromise = null;
          if (!self._resource) {
            return self._getResource();
          }
          return self._resource.mergeByUrl(
            self._resolveUrl(self._resource.notExists(self.waitIconIds)),
            self.options
          );
        });
      }

      return this.waitPromise
        .then(function(iconSet) {
          var
            icon = iconSet.getIconById(iconId);
          return icon
            ? icon
            : Promise.reject();
        });
    }

  });

});