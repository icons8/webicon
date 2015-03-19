'use strict';

var CHECK_URL_REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i;

var iconManager = {

  _iconsScope: {},
  _iconSetsScope: {},

  _defaultIconSetId: null,
  _defaultIconSize: config.defaultIconSize,

  registerIcon: function(id, urlResolver, options) {
    var
      config = this._parseEntityConfigFromArguments(id, urlResolver, options);
    this._iconsScope[config.id] = config;
    return this;
  },

  registerIconSet: function(id, urlResolver, options) {
    var
      config = this._parseEntityConfigFromArguments(id, urlResolver, options);
    this._iconSetsScope[config.id] = config;
    return this;
  },

  setDefaultIconSetId: function(id) {
    this._defaultIconSetId = id;
    return this;
  },

  setDefaultIconSize: function(iconSize) {
    this._defaultIconSize = iconSize;
    return this;
  },

  getDefaultIconSize: function() {
    return this._defaultIconSize;
  },

  preloadIcons: function() {
    var
      self = this,
      iconsScope = this._iconsScope,
      iconSetsScope = this._iconSetsScope;

    Object.keys(iconsScope).forEach(function(id) {
      self._getIcon(id);
    });
    Object.keys(iconSetsScope).forEach(function(id) {
      if (!iconSetsScope[id].cumulative) {
        self._getIconSet(id);
      }
    })

  },

  getIcon: function(id) {
    var
      delimiterPosition,
      iconId,
      iconSetId,
      compositeId;

    id = id || '';

    if (CHECK_URL_REGEX.test(id)) {
      if (!this.hasIcon(id)) {
        this.registerIcon(id, id);
      }
      return this._getIcon(id)
        .catch(this._announceIconNotFoundForPromiseCatch(id));
    }

    iconId = id;
    iconSetId = null;
    delimiterPosition = id.indexOf(':');
    if (delimiterPosition != -1) {
      iconSetId = id.slice(0, delimiterPosition);
      iconId = id.slice(delimiterPosition+1);
    }

    if (iconSetId) {
      if (this.hasIconSet(iconSetId)) {
        return this._getIconFromIconSet(iconId, iconSetId)
          .catch(this._announceIconNotFoundForPromiseCatch(iconId, iconSetId));
      }
    }
    else {
      if (this.hasIcon(iconId)) {
        return this._getIcon(iconId)
          .catch(this._announceIconNotFoundForPromiseCatch(iconId));
      }
      if (this.hasDefaultIconSet()){
        return this._getIconFromDefaultIconSet(iconId)
          .catch(this._announceIconNotFoundForPromiseCatch(iconId, this._defaultIconSetId));
      }
    }

    return this._announceIconNotFound(id);
  },

  hasIcon: function(id) {
    return this._iconsScope.hasOwnProperty(id);
  },

  hasIconSet: function(id) {
    return this._iconSetsScope.hasOwnProperty(id);
  },

  hasDefaultIconSet: function() {
    return this._defaultIconSetId && this.hasIconSet(this._defaultIconSetId);
  },


  _cacheIcon: function(id, promise) {
    var
      iconScope = this._iconsScope[id];
    iconScope._cache = promise;
    promise.catch(function() {
      delete iconScope._cache;
    });
    return promise;
  },

  _getIcon: function(id) {
    var
      iconScope = this._iconsScope[id];
    if (iconScope._cache) {
      return iconScope._cache;
    }
    return this._cacheIcon(
      id,
      Icon.loadByUrl(iconScope.urlResolver(), iconScope)
    );
  },

  _getIconFromDefaultIconSet: function(id) {
    return this._getIconFromIconSet(id, this._defaultIconSetId);
  },

  _cacheIconSet: function(id, promise) {
    var
      iconScope = this._iconSetsScope[id];
    iconScope._cache = promise;
    promise.catch(function() {
      delete iconScope._cache;
    });
    return promise;
  },

  _getIconFromIconSet: function(iconId, iconSetId) {
    var
      self = this,
      Promise = getService('Promise'),
      timeout = getService('timeout'),
      iconSetScope = this._iconSetsScope[iconSetId],
      local = iconSetScope._local;

    if (iconSetScope.cumulative) {
      if (local.wait) {
        if (local.icons.indexOf(iconId) == -1) {
          local.icons.push(iconId);
        }
        return getIcon(local.wait);
      }
      else {
        local.icons = [iconId];
        local.wait = timeout(config.defaultDelayForCumulativeIconSet).then(function() {
          local.wait = null;
          return loadIconSet(local.icons);
        });

        return getIcon(local.wait);
      }
    }
    else {
      return getIcon(loadIconSet());
    }

    function loadIconSet(iconIdList) {
      if (!iconIdList) {
        if (iconSetScope._cache) {
          return iconSetScope._cache;
        }
        return self._cacheIconSet(
          iconSetId,
          IconSet.loadByUrl(iconSetScope.urlResolver(), iconSetScope)
        );
      }
      if (!iconSetScope._cache) {
        return self._cacheIconSet(
          iconSetId,
          IconSet.loadByUrl(iconSetScope.urlResolver(iconIdList), iconSetScope)
        )
      }
      return iconSetScope._cache
        .then(function(iconSet) {
          return iconSet.mergeByUrl(
            iconSetScope.urlResolver(iconSet.notExists(iconIdList)),
            iconSetScope
          )
        });
    }

    function getIcon(promise) {
      return promise
        .then(function(iconSet) {
          var
            icon = iconSet.getIconById(iconId);
          return icon
            ? icon
            : Promise.reject();
        });
    }

  },

  _getIconSet: function(iconSetId) {
    var
      iconSetScope = this._iconSetsScope[iconSetId],
      log = getService('log'),
      Promise = getService('Promise'),
      errorMessage;

    if (iconSetScope.cumulative) {
      errorMessage = 'cannot get "' + iconSetId + '", operation not supported for cumulative iconSet';
      log.warn(errorMessage);
      return Promise.reject(errorMessage);
    }
    if (iconSetScope._cache) {
      return iconSetScope._cache;
    }
    return this._cacheIconSet(
      iconSetId,
      IconSet.loadByUrl(iconSetScope.urlResolver(), iconSetScope)
    );
  },


  _announceIconNotFound: function(iconId, iconSetId) {
    var
      log = getService('log'),
      Promise = getService('Promise'),
      errorMessage = 'icon "' + iconId + '" not found';

    if (iconSetId) {
      errorMessage += ' in "' + iconSetId + '" icon set';
    }
    log.warn(errorMessage);
    return Promise.reject(errorMessage);
  },

  _announceIconNotFoundForPromiseCatch: function(iconId, iconSetId) {
    var
      self = this;
    return function() {
      return self._announceIconNotFound(iconId, iconSetId);
    }
  },

  _parseEntityConfigFromArguments: function(id, urlConfig, options) {
    var
      mergeObjects = getService('mergeObjects'),
      url,
      urlFn,
      params = null,
      iconSize,
      viewBox,
      config,
      urlResolver
      ;

    config = {
      id: id
    };

    if (url && typeof url == 'object') {
      url = urlConfig.url;
      params = urlConfig.params;
    }
    else {
      url = urlConfig;
    }

    urlFn = (typeof url == 'function')
      ? url
      : function() { return url; };

    if (options) {
      switch(typeof options) {
        case 'number':
          iconSize = options;
          break;
        case 'string':
          viewBox = options;
          break;
      }
    }
    else {
      options = {};
    }

    config.iconSize = iconSize || options.iconSize;
    config.viewBox = viewBox || options.viewBox;
    config.cumulative = options.cumulative;

    urlResolver = function(/* value[, value[, ...]]] */) {
      var
        urlConfig,
        _params = null,
        url
        ;

      urlConfig = urlFn.apply(null, Array.prototype.slice.call(arguments));
      url = urlConfig;
      if (urlConfig && typeof urlConfig == 'object') {
        url = urlConfig.url;
        _params = urlConfig.params;
      }

      return {
        url: url,
        params: mergeObjects({}, params || {}, _params || {})
      }
    };

    config.urlResolver = urlResolver;
    config._local = {};

    return config;
  }

};


