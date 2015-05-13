'use strict';

di('configPerformBaseStrategy', function(injector) {
  var
    publicApi = injector('publicApi'),
    iconManager = injector('iconManager')
  ;

  return function configPerformBaseStrategy(config) {
    var
      parsedConfig,
      addConfig,
      addConfigDecorator,
      configStrategies,
      iconSetsExistenceMap = {};

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
      parseUrlConfig).forEach(addConfigDecorator('icon'));

    parseConfigs(
      config.svgSets,
      config.svgSet,
      config.iconSets,
      config.iconSet,
      parseUrlConfig).forEach(addConfigDecorator('svgSet'));

    parseConfigs(
      config.fonts,
      config.font,
      parseCssClassConfig).forEach(addConfigDecorator('font'));

    parseConfigs(
      config.sprites,
      config.sprite,
      parseCssClassConfig).forEach(addConfigDecorator('sprite'));

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
          parseSvgIconSizeConfig(config);
          publicApi.icon(config.id, config.url, config);
        }
      },
      svgSet: function(entity, config) {
        if (!iconSetsExistenceMap[config.id]) {
          parseSvgIconSizeConfig(config);
          publicApi.svgSet(config.id, config.url, config);
          if (config.default || config.defaultSource) {
            publicApi.defaultSource(config.id);
          }
        }
      }
    };
    configStrategies.font = configStrategies.sprite = function(entity, config) {
      if (!iconSetsExistenceMap[config.id]) {
        publicApi[entity](config.id, config.className, config);
        if (config.default || config.defaultSource) {
          publicApi.defaultSource(config.id);
        }
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
          parseSvgIconSizeConfig(config);
          publicApi.defaultSvgSetUrl(config.url, config);
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
      parseSvgIconSizeConfig
    ).forEach(function(config) {
        publicApi.defaultSvgIconSize(config.iconSize);
      });

    if (config.preload) {
      publicApi.preload();
    }
  };


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

  function parseUrlConfig(config, id) {
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

  function parseCssClassConfig(config, id) {
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

  function parseSvgIconSizeConfig(config) {
    if (typeof config != 'object') {
      config = {
        iconSize: config
      }
    }
    config.iconSize = config.iconSize || config.size || config.svgIconSize;
    return config.iconSize
      ? config
      : null;
  }

});