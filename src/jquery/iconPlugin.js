
jQuery.fn.i8icon = I8IconPlugin;

function I8IconPlugin(config) {
  config = config || {};

  if (typeof config == 'string') {
    config = {
      icon: config
    };
  }

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
    if (config && !iconManager.hasIcon(config.id)) {
      iconManager.registerIcon(config.id, config.url, config);
    }
  }

  function performIconSetConfig(config) {
    if (config && !iconManager.hasIconSet(config.id)) {
      iconManager.registerIconSet(config.id, config.url, config);
    }
  }

  return this.each(function() {
    var
      I8_ICON_DATA_KEY = '__i8.icon.instance',
      element = $(this),
      instance = element.data(I8_ICON_DATA_KEY),
      options = {
        icon: config.icon
      };

    if (instance) {
      instance.refresh(options);
    }
    else {
      element.data(I8_ICON_DATA_KEY, new I8Icon(element, options));
    }
  });
}

function I8Icon(element, options) {
  options = options || {};

  this._element = element;

  expectAlt(element, this._getAlt() || options.alt || '');

  this._renderIcon(this._getIconId() || options.icon);

}

I8Icon.prototype = {

  _getAlt: function() {
    var
      element = this._element;
    return element.attr('alt') || element.data('alt');
  },

  _getIconId: function() {
    var
      element = this._element;
    return element.attr('icon') || element.attr('i8-icon')
      || element.data('icon') || element.data('i8-icon');
  },

  _renderIcon: function(iconId) {
    var
      element = this._element;

    iconId = iconId || this._getIconId();

    if (iconId == this._renderedIconId) {
      return;
    }

    element.empty();
    if (iconId) {
      iconManager.getIcon(iconId).then(function(icon) {
        element.append(icon.clone());
      });
    }

    this._renderedIconId = iconId;
  },

  refresh: function(options) {
    this._renderIcon(this._getIconId() || options.icon);
  }

};