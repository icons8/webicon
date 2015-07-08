'use strict';

di('iconManager', function(injector) {

  var
    CHECK_URL_REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i,
    DEFAULT_SVG_ICON_SIZE = 24,
    SINGLE_ICONS_COLLECTION_ID = '__SINGLE_ICONS_COLLECTION';

  function IconManager() {
    this._collections = {};
    this._defaultCollectionId = null;
    this._defaultSvgIconSize = DEFAULT_SVG_ICON_SIZE;
  }

  IconManager.prototype = {

    addIcon: function(id, urlConfig, options) {
      var
        url = urlConfig,
        ext;

      if (typeof urlConfig == 'object') {
        url = urlConfig.url;
      }
      ext = typeof url == 'function'
        ? getExt(url())
        : getExt(url + '');

      return ext == 'svg' || !ext
        ? this.addSvgIcon(id, urlConfig, options)
        : this.addImageIcon(id, urlConfig)
      ;

      function getExt(url) {
        return url
            .split('?')[0]
            .split(/[/\\]/)
            .slice(-1)[0]
            .split('.')
            .slice(-1)[0]
            .toLowerCase();
      }
    },

    addSvgIcon: function(id, urlConfig, options) {
      var
        SvgIconScope = injector('SvgIconScope');
      this._getSingleIconsCollection().add(new SvgIconScope(id, urlConfig, options));
      return this;
    },

    addImageIcon: function(id, urlConfig, options) {
      var
        ImageIconScope = injector('ImageIconScope');
      this._getSingleIconsCollection().add(new ImageIconScope(id, urlConfig, options));
      return this;
    },

    addSvgIconSet: function(id, urlConfig, options) {
      var
        SvgCumulativeIconSetScope = injector('SvgCumulativeIconSetScope'),
        SvgIconSetScope = injector('SvgIconSetScope'),
        ScopeConstructor;

      options = options || {};

      ScopeConstructor = options.cumulative
        ? SvgCumulativeIconSetScope
        : SvgIconSetScope;

      this._getCollection(id).add(new ScopeConstructor(id, urlConfig, options));

      return this;
    },

    addFontIconSet: function(id, cssClassConfig, options) {
      var
        FontIconSetScope = injector('FontIconSetScope');
      this._getCollection(id).add(new FontIconSetScope(id, cssClassConfig, options));
      return this;
    },

    addSpriteIconSet: function(id, cssClassConfig, options) {
      var
        SpriteIconSetScope = injector('SpriteIconSetScope');
      this._getCollection(id).add(new SpriteIconSetScope(id, cssClassConfig, options));
      return this;
    },

    addIconSetAlias: function(id, alias) {
      if (!this._collections.hasOwnProperty(alias)) {
        this._collections[alias] = this._getCollection(id);
      }
      return this;
    },

    setDefaultIconSet: function(id) {
      this._defaultCollectionId = id;
      return this;
    },

    setDefaultSvgIconSize: function(iconSize) {
      this._defaultSvgIconSize = iconSize;
      return this;
    },

    getDefaultSvgIconSize: function() {
      return this._defaultSvgIconSize;
    },

    preload: function(names) {
      var
        self = this,
        collections = this._collections,
        namesSet = {},
        useSetOfNames = false,
        forceAll = false,
        promise,
        promises = [],
        iconSetPromisesMap = {},
        Promise = injector('Promise');

      if (names && typeof names == 'object') {
        (
          Array.isArray(names)
            ? names
            : Object.keys(names)
        )
          .forEach(function(name) {
            namesSet[String(name).toLowerCase()] = true;
          });
        useSetOfNames = true;
      }
      else if (names) {
        forceAll = true;
      }

      Object.keys(collections).forEach(function(id) {
        var
          value;
        value = collections[id].preload(
          forceAll || (useSetOfNames && namesSet.hasOwnProperty(String(id).toLowerCase()))
        );
        if (value && typeof value == 'object' && typeof value.then == 'function') {
          promises.push(value);
          if (id != SINGLE_ICONS_COLLECTION_ID) {
            iconSetPromisesMap[id] = value
              .then(function() {
                return self._getCollection(id);
              });
          }
        }
      });

      promise = Promise.all(promises);
      promise.iconSets = iconSetPromisesMap;
      return promise;
    },

    getIcon: function(id, params) {
      var
        parts,
        delimiterPosition,
        iconId,
        iconSetId;

      id = id || '';
      params = params || [];
      parts = id
        .split(/\s+/)
        .filter(function(value) {
          return value;
        });
      id = parts[0];
      Array.prototype.push.apply(params, parts.slice(1));

      if (CHECK_URL_REGEX.test(id)) {
        if (!this.hasSingleIcon(id)) {
          this.addIcon(id, id);
        }
        return this._getSingleIconsCollection().getIcon(id, params)
          .then(null, announceIconNotFoundForPromiseCatch(id));
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
          return this._getCollection(iconSetId).getIcon(iconId, params)
            .then(null, announceIconNotFoundForPromiseCatch(iconId, iconSetId));
        }
      }
      else {
        if (this.hasSingleIcon(iconId, params)) {
          return this._getSingleIconsCollection().getIcon(iconId, params)
            .then(null, announceIconNotFoundForPromiseCatch(iconId));
        }
        if (this.hasDefaultIconSet()) {
          return this._getCollection(this._defaultCollectionId).getIcon(iconId, params)
            .then(null, announceIconNotFoundForPromiseCatch(iconId, this._defaultCollectionId));
        }
      }

      return announceIconNotFound(id);
    },

    hasSingleIcon: function(id, params) {
      return this._getSingleIconsCollection()
        .collection
        .filter(function(scope) {
          return scope.hasIcon(id, params);
        })
        .length > 0;
    },

    hasIconSet: function(id) {
      return this._collections.hasOwnProperty(id);
    },

    hasDefaultIconSet: function() {
      return this._defaultCollectionId && this.hasIconSet(this._defaultCollectionId);
    },

    _getCollection: function(id) {
      var
        ScopeCollection = injector('ScopeCollection');
      if (!this._collections.hasOwnProperty(id)) {
        this._collections[id] = new ScopeCollection();
      }
      return this._collections[id];
    },

    _getSingleIconsCollection: function() {
      return this._getCollection(SINGLE_ICONS_COLLECTION_ID);
    }

  };


  function announceIconNotFound(iconId, iconSetId) {
    var
      log = injector('log'),
      Promise = injector('Promise'),
      errorMessage = 'icon "' + iconId + '" not found';

    if (iconSetId) {
      errorMessage += ' in "' + iconSetId + '" icon set';
    }
    log.warn(errorMessage);
    return Promise.reject(errorMessage);
  }

  function announceIconNotFoundForPromiseCatch(iconId, iconSetId) {
    return function() {
      return announceIconNotFound(iconId, iconSetId);
    }
  }



  return new IconManager;


});

