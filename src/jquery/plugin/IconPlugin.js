'use strict';

function IconPlugin(config) {
  config = config || {};

  if (typeof config == 'string') {
    config = {
      icon: config
    };
  }

  IconPlugin._applyConfig(config);

  if (!IconsPlugin.bootstraped) {
    IconsPlugin.cancelBootstrap();
  }

  return this.each(function() {
    var
      I8_ICON_DATA_KEY = '__I8_ICON_DATA',
      element = jQuery(this),
      instance = element.data(I8_ICON_DATA_KEY),
      options = {
        icon: config.icon + ''
      };

    if (instance) {
      instance.refresh(options);
    }
    else {
      element.data(I8_ICON_DATA_KEY, new IconController(element, options));
    }
  });
}

IconPlugin._applyConfig = function(config) {
  config = config || {};

  normalizeConfigs(config.icons).forEach(performIconConfig);
  normalizeConfigs(config["icon-sets"] || config.iconSets).forEach(performIconSetConfig);

  function normalizeConfigs(configs) {
    if (configs && typeof configs == 'object') {
      if (Array.isArray(configs)) {
        configs = configs.map(normalizeConfig);
      }
      else {
        configs = Object.keys(configs)
          .map(function(id) {
            return normalizeConfig(configs[id], id);
          });
      }
      return configs.filter(function(config) {
        return config;
      });
    }
    return [];
  }

  function normalizeConfig(config, id) {
    config = config || {};
    if (typeof config == 'string') {
      config = {
        url: config
      }
    }
    if (!config.id && config.id !== 0) {
      config.id = id;
    }
    config.url = config.url || config.uri;
    return config.id && config.url
      ? config
      : null;
  }

  function performIconConfig(config) {
    var
      iconManager = di('iconManager');
    if (config && !iconManager.hasSingleIcon(config.id)) {
      iconManager.addIcon(config.id, config.url, config);
    }
  }

  function performIconSetConfig(config) {
    var
      iconManager = di('iconManager');
    if (config && !iconManager.hasIconSet(config.id)) {
      iconManager.addSvgIconSet(config.id, config.url, config);
    }
  }

};

function IconController(element, options) {
  var
    initIconElement = di('initIconElement');

  options = options || {};

  this._element = element;
  initIconElement(element, this._getAlt() || options.alt);
  this._renderIcon(this._getIconId() || options.icon);
}

IconController.prototype = {

  _getAlt: function() {
    var
      element = this._element;
    return element.attr('alt') || element.data('alt');
  },

  _getIconId: function() {
    var
      element = this._element,
      index,
      prefixes,
      prefix,
      list,
      id = null;

    prefixes = ['', 'i8-', 'i8', 'i8:'];
    for (index = 0; !id && index < prefixes.length; index++) {
      prefix = prefixes[index];
      id = element.attr(prefix + 'icon') || element.data(prefix + 'icon');
    }

    if (!id) {
      list = element
        .attr('class')
        .split(/\s+/);

      if (list.indexOf('i8icon') != -1 || list.indexOf('i8-icon') != -1) {
        list = list.map(function(className) {
          var
            match;
          match = /^icon[-:](.+)$/i.exec(className);
          return match && match[1];
        });
      }
      else {
        list = list.map(function(className) {
          var
            match;
          match = /^i8[-:]?icon[-:](.+)$/i.exec(className);
          return match && match[1];
        });
      }

      id = list
        .filter(function(iconId) {
          return iconId;
        })
        [0];
    }

    return id;
  },

  _renderIcon: function(iconId) {
    var
      iconManager = di('iconManager'),
      element = this._element,
      cleaner = this._renderedIconCleaner,
      self = this;

    iconId = iconId || this._getIconId();

    if (iconId == this._renderedIconId) {
      return;
    }

    cleaner && cleaner();
    this._renderedIconCleaner = null;
    if (iconId) {
      iconManager.getIcon(iconId).then(function(icon) {
        self._renderedIconCleaner = icon.render(element);
      });
    }

    this._renderedIconId = iconId;
  },

  refresh: function(options) {
    this._renderIcon(this._getIconId() || options.icon);
  }

};