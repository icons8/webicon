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
  var
    publicApi = di('publicApi'),
    iconManager = di('iconManager');

  if (typeof config == 'function') {
    config = config(publicApi);
  }
  config = config || {};

  normalizeConfigs(config.icons || config.icon, normalizeUrlBasedConfig).forEach(function(config) {
    if (!iconManager.hasSingleIcon(config.id)) {
      iconManager.addIcon(config.id, config.url, config);
    }
  });
  normalizeConfigs(config["icon-sets"] || config.iconSets || config["icon-set"] || config.iconSet, normalizeUrlBasedConfig).forEach(function(config) {
    if (!iconManager.hasIconSet(config.id)) {
      iconManager.addSvgIconSet(config.id, config.url, config);
    }
  });
  normalizeConfigs(config.fonts || config.font, normalizeClassNameBasedConfig).forEach(function(config) {
    if (!iconManager.hasIconSet(config.id)) {
      iconManager.addFontIconSet(config.id, config.className);
    }
  });
  normalizeConfigs(config.sprites || config.sprite, normalizeClassNameBasedConfig).forEach(function(config) {
    if (!iconManager.hasIconSet(config.id)) {
      iconManager.addSpriteIconSet(config.id, config.className);
    }
  });

  function normalizeConfigs(configs, normalizeConfigFilter) {
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

    function normalizeConfig(config, id) {
      config = config || {};
      if (typeof config != 'string') {
        if (!config.id && config.id !== 0) {
          config.id = id;
        }
      }
      return normalizeConfigFilter && normalizeConfigFilter(config, id);
    }
  }

  function normalizeUrlBasedConfig(config, id) {
    if (typeof config == 'string') {
      config = {
        url: config,
        id: id
      }
    }
    config.url = config.url || config.uri;
    return config.id && config.url
      ? config
      : null;
  }

  function normalizeClassNameBasedConfig(config, id) {
    if (typeof config == 'string') {
      config = {
        className: config,
        id: id
      }
    }
    config.className = config.className || config["class"];
    return config.id && config.className
      ? config
      : null;
  }

};

function IconController(element, options) {
  var
    initIconElement = di('initIconElement'),
    id;

  options = options || {};
  this._element = element;

  id = this._getIconId() || options.icon;
  initIconElement(element, this._getAlt() || options.alt || id);
  this._renderIcon(id);
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
      id = null;

    prefixes = ['', 'i8-', 'i8', 'i8:'];
    for (index = 0; !id && index < prefixes.length; index++) {
      prefix = prefixes[index];
      id = element.attr(prefix + 'icon') || element.data(prefix + 'icon');
    }

    if (!id) {
      id = element
        .attr('class')
        .split(/\s+/)
        .map(function(className) {
          var
            match,
            parts;
          match = /^i8[-:]?icon[-:]([^;|,]+)[;|,]?(.*)$/i.exec(className);
          if (!match || !match[1]) {
            return null;
          }
          parts = [match[1]];
          if (match[2]) {
            Array.prototype.push.apply(parts, match[2].split(/[;|,:]/));
          }
          return parts.join(' ');
        })
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