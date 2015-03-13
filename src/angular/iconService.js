'use strict';

angular
  .module('i8.icon')
  .provider('$i8Icon', I8IconProvider);

/**
 * @ngdoc service
 * @name $i8IconProvider
 * @module i8.icon
 *
 * @description
 *
 * <hljs lang="js">
 * </hljs>
 *
 */

var config = {
  defaultIconSize: 24
};

function I8IconProvider() { }

I8IconProvider.prototype = {
  icon : function icon(id, url, iconSize) {
    if ( id.indexOf(':') == -1 ) id = '$default:' + id;

    config[id] = new ConfigurationItem(url, iconSize );
    return this;
  },

  iconSet : function iconSet(id, url, iconSize) {
    config[id] = new ConfigurationItem(url, iconSize );
    return this;
  },

  defaultIconSet : function defaultIconSet(url, iconSize) {
    var setName = '$default';

    if ( !config[setName] ) {
      config[setName] = new ConfigurationItem(url, iconSize );
    }

    config[setName].iconSize = iconSize || config.defaultIconSize;

    return this;
  },

  defaultIconSize : function defaultIconSize(iconSize) {
    config.defaultIconSize = iconSize;
    return this;
  },

  preloadIcons: function ($templateCache) {
    var iconProvider = this;
    var svgRegistry = [
      {
        id : 'tabs-arrow',
        url: 'tabs-arrow.svg',
        svg: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24"><g id="tabs-arrow"><polygon points="15.4,7.4 14,6 8,12 14,18 15.4,16.6 10.8,12 "/></g></svg>'
      },
      {
        id : 'close',
        url: 'close.svg',
        svg: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24"><g id="close"><path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"/></g></svg>'
      },
      {
        id:  'cancel',
        url: 'cancel.svg',
        svg: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24"><g id="cancel"><path d="M12 2c-5.53 0-10 4.47-10 10s4.47 10 10 10 10-4.47 10-10-4.47-10-10-10zm5 13.59l-1.41 1.41-3.59-3.59-3.59 3.59-1.41-1.41 3.59-3.59-3.59-3.59 1.41-1.41 3.59 3.59 3.59-3.59 1.41 1.41-3.59 3.59 3.59 3.59z"/></g></svg>'
      }
    ];

    svgRegistry.forEach(function(asset){
      iconProvider.icon(asset.id,  asset.url);
      $templateCache.put(asset.url, asset.svg);
    });

  },

  $get : ['$http', '$q', '$log', '$templateCache', function($http, $q, $log, $templateCache) {
    this.preloadIcons($templateCache);
    return new I8IconService(config, $http, $q, $log, $templateCache);
  }]
};

function ConfigurationItem(url, iconSize) {
  this.url = url;
  this.iconSize = iconSize || config.defaultIconSize;
}

/**
 * @ngdoc service
 * @name $i8Icon
 * @module i8.icon
 *
 * @description
 *
 * @usage
 * <hljs lang="js">
 * </hljs>
 */

function I8IconService(config, $http, $q, $log, $templateCache) {
  var iconCache = {};
  var urlRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i;

  Icon.prototype = { clone : cloneSVG, prepare: prepareAndStyle };

  return function getIcon(id) {
    id = id || '';

    if ( iconCache[id]         ) return $q.when( iconCache[id].clone() );
    if ( urlRegex.test(id)     ) return loadByURL(id).then( cacheIcon(id) );
    if ( id.indexOf(':') == -1 ) id = '$default:' + id;

    return loadByID(id)
      .catch(loadFromIconSet)
      .catch(announceIdNotFound)
      .catch(announceNotFound)
      .then( cacheIcon(id) );
  };

  function cacheIcon( id ) {

    return function updateCache( icon ) {
      iconCache[id] = isIcon(icon) ? icon : new Icon(icon, config[id]);

      return iconCache[id].clone();
    };
  }

  function loadByID(id) {
    var iconConfig = config[id];

    return !iconConfig ? $q.reject(id) : loadByURL(iconConfig.url).then(function(icon) {
      return new Icon(icon, iconConfig);
    });
  }

  function loadFromIconSet(id) {
    var setName = id.substring(0, id.lastIndexOf(':')) || '$default';
    var iconSetConfig = config[setName];

    return !iconSetConfig ? $q.reject(id) : loadByURL(iconSetConfig.url).then(extractFromSet);

    function extractFromSet(set) {
      var iconName = id.slice(id.lastIndexOf(':') + 1);
      var icon = set.querySelector('#' + iconName);
      return !icon ? $q.reject(id) : new Icon(icon, iconSetConfig);
    }
  }

  function loadByURL(url) {
    return $http
      .get(url, { cache: $templateCache })
      .then(function(response) {
        return angular.element('<div>').append(response.data).find('svg')[0];
      });
  }

  function announceIdNotFound(id) {
    var msg;

    if (angular.isString(id)) {
      msg = 'icon ' + id + ' not found';
      $log.warn(msg);
    }

    return $q.reject(msg || id);
  }

  function announceNotFound(err) {
    var msg = angular.isString(err) ? err : (err.message || err.data || err.statusText);
    $log.warn(msg);

    return $q.reject(msg);
  }

  function isIcon(target) {
    return angular.isDefined(target.element) && angular.isDefined(target.config);
  }

  function Icon(el, config) {
    if (el.tagName != 'svg') {
      el = angular.element('<svg xmlns="http://www.w3.org/2000/svg">').append(el)[0];
    }

    if ( !el.getAttribute('xmlns') ) {
      el.setAttribute('xmlns', "http://www.w3.org/2000/svg");
    }

    this.element = el;
    this.config = config;
    this.prepare();
  }

  function prepareAndStyle() {
    var iconSize = this.config ? this.config.iconSize : config.defaultIconSize;
    angular.forEach({
      'fit'   : '',
      'height': '100%',
      'width' : '100%',
      'preserveAspectRatio': 'xMidYMid meet',
      'viewBox' : this.element.getAttribute('viewBox') || ('0 0 ' + iconSize + ' ' + iconSize)
    }, function(val, attr) {
      this.element.setAttribute(attr, val);
    }, this);

    angular.forEach({
      'pointer-events' : 'none',
      'display' : 'block'
    }, function(val, style) {
      this.element.style[style] = val;
    }, this);
  }

  function cloneSVG(){
    return this.element.cloneNode(true);
  }

}
