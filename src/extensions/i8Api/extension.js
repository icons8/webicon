'use strict';

ready(function(di) {
  var
    iconManager = di('iconManager'),
    platforms = {
      ios8: ['ios', 'ios7', 'i'],
      win8: ['win', 'w'],
      android: ['kitkat', 'ak', 'a-k', 'k'],
      androidL: ['android-l', 'al', 'a-l', 'l'],
      flat_color: ['color', 'c', 'colored']
    },
    platformsMap,
    possiblePrefixes;

  platformsMap = {};
  Object.keys(platforms).forEach(function(platform) {
    platformsMap[platform.toLowerCase()] = platform;
    platforms[platform].forEach(function(alias) {
      platformsMap[alias] = platform;
    });
  });

  possiblePrefixes = Object.keys(platforms)
    .map(function(platform) {
      return platform.toLowerCase();
    });
  possiblePrefixes.push(
    'ios7'
  );

  iconManager
    .setDefaultIconSet('i8')
    .addSvgIconSet(
      'i8',
      function(icons) {
        var
          options = {
            url: di('i8ApiConfig').gateway.url,
            params: {}
          };

        if (icons) {
          if (!Array.isArray(icons)) {
            icons = [icons];
          }
          options.params.icons = icons.join(',');
        }
        return options;
      },
      {
        cumulative: true,
        iconIdResolver: function(id, params) {
          var
            index,
            position,
            prefix;
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
          position = id.indexOf('-');
          if (position > 0) {
            prefix = id.slice(0, position).toLowerCase();
            if (possiblePrefixes.indexOf(prefix)) {
              return [platformsMap[prefix], id.slice(position + 1)].join('-');
            }
          }
          return [platformsMap['c'], id].join('-');
        }
      }
    );

});

