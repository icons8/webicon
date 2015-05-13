'use strict';

function i8ApiExtension(injector, config) {
  var
    publicApi = injector('publicApi'),
    iconManager = injector('iconManager'),
    platforms = {
      ios8: ['ios', 'ios7', 'i'],
      win8: ['win', 'w'],
      android: ['kitkat', 'ak', 'a-k', 'k'],
      androidL: ['android-l', 'al', 'a-l', 'l'],
      flat_color: ['color', 'c', 'colored']
    },
    platformsMap,
    apiToken;

  platformsMap = {};
  Object.keys(platforms).forEach(function(platform) {
    platformsMap[platform.toLowerCase()] = platform;
    platforms[platform].forEach(function(alias) {
      platformsMap[alias] = platform;
    });
  });

  iconManager
    .setDefaultIconSet('i8')
    .addSvgIconSet(
    'i8',
    function(icons) {
      var
        options = {
          url: config.gateway.url,
          params: {}
        };

      if (icons) {
        if (!Array.isArray(icons)) {
          icons = [icons];
        }
        options.params.icons = icons.join(',');
      }
      if (apiToken) {
        options.params.token = apiToken;
      }
      return options;
    },
    {
      cumulative: true,
      iconIdParser: function(id, params) {
        var
          index;
        id = String(id || '');
        if (!Array.isArray(params)) {
          params = [];
        }
        params = params.map(function(param) {
          return String(param).toLowerCase();
        });
        for (index = 0; index < params.length; index++) {
          if (platformsMap.hasOwnProperty(params[index])) {
            return [platformsMap[params[index]], id].join('-');
          }
        }

        return [platformsMap['c'], id].join('-');
      }
    }
  );

  publicApi.i8ApiToken = function(token) {
    apiToken = token;
  };

  if (injector.has('configPerformer')) {
    injector('configPerformer').strategy(function(config) {
      if (typeof config.i8ApiToken != 'undefined') {
        publicApi.i8ApiToken(config.i8ApiToken);
      }
    });
  }

}

