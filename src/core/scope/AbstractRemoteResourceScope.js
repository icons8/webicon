'use strict';

di('AbstractRemoteResourceScope', function(injector) {
  var
    AbstractScope = injector('AbstractScope'),
    inherit = injector('inherit')
  ;

  function AbstractRemoteResourceScope(id, urlConfig, options) {
    AbstractScope.call(this, id, options);

    this._urlResolver = parseUrlResolver(urlConfig);
    this._preloadable = this.options.preloadable || typeof this.options.preloadable == 'undefined';
    this._cache = null;
    this._resource = null;
  }

  return inherit(AbstractRemoteResourceScope, AbstractScope, {

    preload: function() {
      return this._preloadable
        ? this._getResource()
        : true;
    },

    _resolveUrl: function(url) {
      return this._urlResolver(url);
    },

    _getResource: function() {
      var
        promise,
        self = this;

      if (this._cache) {
        return this._cache;
      }
      promise = this._cache = this._loadResource();
      promise.then(null,
        function(resource) {
          self._resource = resource;
        },
        function() {
          self._cache = null;
        }
      );

      return promise;
    },

    _loadResource: function() {
      var
        Promise = injector('Promise');
      return Promise.reject();
    }

  });

  function parseUrlResolver(urlConfig) {
    var
      mergeObjects = injector('mergeObjects'),
      url,
      urlFn,
      params = null;

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

    return function(/* value[, value[, ...]]] */) {
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

      url = String(url || '');
      if (url.slice(0, 2) === '//') {
        url = window.document.location.protocol + url;
      }

      return {
        url: url,
        params: mergeObjects({}, params || {}, _params || {})
      }
    };
  }

});