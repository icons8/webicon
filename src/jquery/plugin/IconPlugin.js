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
    iconManager = di('iconManager'),
    parsedConfig,
    addConfig,
    addConfigDecorator,
    configStrategies,
    iconSetsExistenceMap = {};

  if (typeof config == 'function') {
    config = config(publicApi);
  }
  config = config || {};

  parsedConfig = {};
  addConfig = function(entity, config) {
    if (!parsedConfig[entity]) {
      parsedConfig[entity] = {};
    }
    if (!parsedConfig[entity][config.id]) {
      parsedConfig[entity][config.id] = [];
    }
    parsedConfig[entity][config.id].push(config);
  };

  addConfigDecorator = function(entity) {
    return function(config) {
      addConfig(entity, config);
    }
  };

  parseConfigs(
    config.icons,
    config.icon,
    parseUrlBasedConfig).forEach(addConfigDecorator('icon'));

  parseConfigs(
    config.svgSets,
    config.svgSet,
    config.iconSets,
    config.iconSet,
    parseUrlBasedConfig).forEach(addConfigDecorator('svgSet'));

  parseConfigs(
    config.fonts,
    config.font,
    parseCssClassNameBasedConfig).forEach(addConfigDecorator('font'));

  parseConfigs(
    config.sprites,
    config.sprite,
    parseCssClassNameBasedConfig).forEach(addConfigDecorator('sprite'));

  ['svgSet', 'font', 'sprite'].forEach(function(entity) {
    Object.keys(parsedConfig[entity] || {}).forEach(function(id) {
      if (!iconSetsExistenceMap.hasOwnProperty(id)) {
        iconSetsExistenceMap[id] = iconManager.hasIconSet(id);
      }
    });
  });

  configStrategies = {
    icon: function(entity, config) {
      if (!iconManager.hasSingleIcon(config.id)) {
        publicApi.icon(config.id, config.url, config);
      }
    },
    svgSet: function(entity, config) {
      if (!iconSetsExistenceMap[config.id]) {
        publicApi.svgSet(config.id, config.url, config);
      }
    }
  };
  configStrategies.font = configStrategies.sprite = function(entity, config) {
    if (!iconSetsExistenceMap[config.id]) {
      publicApi[entity](config.id, config.className, config);
    }
  };

  Object.keys(parsedConfig).forEach(function(entity) {
    Object.keys(parsedConfig[entity] || {}).forEach(function(id) {
      parsedConfig[entity][id].forEach(function(config) {
        configStrategies[entity](entity, config);
      });
    });
  });

  parseConfigs(
    config.defaultSvgSetUrl,
    config.defaultSvgIconSetUrl,
    config.defaultIconSetUrl,
    function(config) {
      if (typeof config != 'object') {
        config = {
          url: config
        }
      }
      config.url = config.url || config.uri;
      return config.url
        ? config
        : null;
    }
  ).forEach(function(config) {
      if (!iconManager.hasIconSet(config.url)) {
        publicApi.defaultSvgSetUrl(config.url);
      }
    });

  parseConfigs(
    config.alias,
    config.sourceAlias,
    function(config, id) {
      if (typeof config != 'object') {
        config = {
          alias: config,
          id: id
        }
      }
      config.alias = config.alias || config.sourceAlias;
      return config.url
        ? config
        : null;
    }
  ).forEach(function(config) {
      if (!iconManager.hasIconSet(config.id)) {
        publicApi.sourceAlias(config.id, config.alias);
      }
    });

  parseConfigs(
    config.default,
    config.defaultSource,
    function(config) {
      if (typeof config != 'object') {
        config = {
          id: config
        }
      }
      return config.id
        ? config
        : null;
    }
  ).forEach(function(config) {
      publicApi.defaultSource(config.id);
    });

  parseConfigs(
    config.defaultSvgIconSize,
    function(config) {
      if (typeof config != 'object') {
        config = {
          size: config
        }
      }
      config.size = config.size || config.iconSize || config.svgIconSize || config["icon-size"] || config["svg-icon-size"];
      return config.size
        ? config
        : null;
    }
  ).forEach(function(config) {
      if (!iconManager.hasIconSet(config.id)) {
        publicApi.defaultSvgIconSize(config.id, config.url);
      }
    });

  if (config.preload) {
    publicApi.preload();
  }


  function parseConfigs(/*...configs, configParserFn*/) {
    var
      args = Array.prototype.slice.call(arguments),
      configs,
      configParserFn;

    configParserFn = args.pop();
    if (args.length > 1) {
      return Array.prototype.concat.apply([],
        args.map(function(configs) {
          return parseConfigs(configs, configParserFn);
        })
      );
    }
    configs = args[0];

    if (configs && typeof configs == 'object') {
      if (Array.isArray(configs)) {
        configs = Array.prototype.concat.apply([], configs.map(parseConfig));
      }
      else {
        configs = Array.prototype.concat.apply([], Object.keys(configs)
          .map(function(id) {
            return parseConfig(configs[id], id);
          })
        );
      }
    }
    else if (typeof configs == 'string' || typeof configs == 'number') {
      configs = [
        parseConfig(configs)
      ];
    }
    else {
      configs = [];
    }
    return configs.filter(function(config) {
      return config;
    });

    function parseConfig(config, id) {
      config = config || {};
      if (Array.isArray(config)) {
        return config.map(function(config) {
          return parseConfig(config, id);
        });
      }
      else if (typeof config == 'object') {
        if (!config.id && config.id !== 0) {
          config.id = id;
        }
      }
      return configParserFn(config, id);
    }
  }

  function parseUrlBasedConfig(config, id) {
    if (typeof config != 'object') {
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

  function parseCssClassNameBasedConfig(config, id) {
    if (typeof config != 'object') {
      config = {
        className: config,
        id: id
      }
    }
    config.className = config.className || config.cssClass || config.class;
    return config.id && config.className
      ? config
      : null;
  }

};

function IconController(element, options) {
  var
    initIconElement = di('initIconElement');

  options = options || {};
  this._element = element;
  this.options = options;

  initIconElement(element, this._getAlt(), this._getIconId());
  this._renderIcon();
}

IconController.prototype = {

  _getAlt: function() {
    var
      element = this._element,
      altAttr = element.attr('alt'),
      altData = element.data('alt');

    if (altAttr === '' || altData === '' || this.options.alt === '') {
      return '';
    }
    return altAttr || altData || this.options.alt;
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

    return id || this.options.icon;
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
    var
      iconId;

    iconId = this.options.icon;
    this.options = options;
    this.options.icon = this.options.icon || iconId;

    this._renderIcon();
  }

};