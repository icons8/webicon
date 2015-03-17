'use strict';

var CHECK_URL_REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i;

var iconManager = {

  _iconsConfig: {},
  _iconsCache: {},

  _iconSetsConfig: {},
  _iconSetsCache: {},

  _defaultIconSetId: null,

  _defaultIconSize: config.defaultIconSize,

  registerIcon: function(id, urlResolver, options) {
    var
      config = parseEntityConfigFromArguments(id, urlResolver, options);
    this._iconsConfig[config.id] = config;
    return this;
  },

  registerIconSet: function(id, urlResolver, options) {
    var
      config = parseEntityConfigFromArguments(id, urlResolver, options);
    this._iconSetsConfig[config.id] = config;
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
      iconsConfig = this._iconsConfig,
      iconSetsConfig = this._iconSetsConfig;

    Object.keys(iconsConfig).forEach(function(id) {
      self._loadIconByUrl(iconsConfig[id].urlResolver());
    });
    Object.keys(iconSetsConfig).forEach(function(id) {
      self._loadIconSetByUrl(iconSetsConfig[id].urlResolver());
    })

  },

  getIcon: function(id) {
    var
      delimiterPosition,
      iconId,
      iconSetId;

    id = id || '';

    if (CHECK_URL_REGEX.test(id)) {
      return this._loadIconByUrl(id);
    }

    iconId = id;
    iconSetId = null;
    delimiterPosition = id.indexOf(':');
    if (delimiterPosition != -1) {
      iconSetId = id.slice(0, delimiterPosition);
      iconId = id.slice(delimiterPosition+1);
    }

    if (this._hasIconSet(iconSetId)) {
      return this._getIconFromIconSet(iconId, iconSetId)
        .catch(this._announceIconNotFoundForPromiseCatch(iconId, iconSetId));
    }
    if (this._hasIcon(iconId)) {
      return this._getIcon(iconId)
        .catch(this._announceIconNotFoundForPromiseCatch(iconId));
    }
    if (this._hasDefaultIconSet()){
      return this._getIconFromDefaultIconSet(iconId)
        .catch(this._announceIconNotFoundForPromiseCatch(iconId, this._defaultIconSetId));
    }

    return this._announceIconNotFound(id);
  },

  _hasIcon: function(id) {
    return this._iconsConfig.hasOwnProperty(id);
  },

  _hasIconSet: function(id) {
    return this._iconSetsConfig.hasOwnProperty(id);
  },

  _hasDefaultIconSet: function() {
    return this._defaultIconSetId && this._hasIconSet(this._defaultIconSetId);
  },

  _getIcon: function(id) {
    return this._loadIconByUrl(this._iconsConfig[id].urlResolver());
  },

  _getIconFromDefaultIconSet: function(id) {
    return this._getIconFromIconSet(id, this._defaultIconSetId);
  },

  _getIconFromIconSet: function(iconId, iconSetId) {
    var
      Promise = getService('Promise');
    return this._loadIconSetByUrl(this._iconSetsConfig[iconSetId].urlResolver())
      .then(function(iconSet) {
        var
          icon = iconSet.getIconById(iconId);
        return icon
          ? icon
          : Promise.reject();
      });
  },

  _cacheIcon: function(id, promise) {
    var
      iconsCache = this._iconsCache;
    iconsCache[id] = promise;
    promise.catch(function() {
      delete iconsCache[id];
    });
    return promise;
  },

  _loadIconByUrl: function(url) {
    if (this._iconsCache.hasOwnProperty(url)) {
      return this._iconsCache[url];
    }
    return this._cacheIcon(url, Icon.loadByUrl(url));
  },

  _cacheIconSet: function(id, promise) {
    var
      iconSetsCache = this._iconSetsCache;
    iconSetsCache[id] = promise;
    promise.catch(function() {
      delete iconSetsCache[id];
    });
    return promise;
  },

  _loadIconSetByUrl: function(url) {
    if (this._iconSetsCache.hasOwnProperty(url)) {
      return this._iconSetsCache[url];
    }
    return this._cacheIconSet(url, IconSet.loadByUrl(url));
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
  }

};


function parseEntityConfigFromArguments(id, urlConfig, options) {
  var
    url,
    urlFn,
    params = null,
    iconSize,
    viewBox,
    config,
    urlResolver
    ;

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
  if (iconSize) {
    options.iconSize = iconSize;
  }
  if (viewBox) {
    options.viewBox = viewBox;
  }

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

    return buildUrl(url, mergeObjects({}, params || {}, _params || {}));
  };

  config = {
    id: id,
    urlResolver: urlResolver,
    options: options
  };

  return config;
}