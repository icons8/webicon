
config.i8Api = {
  apiGateway: {
    url: '//localhost:3452/icon-sets'
  },
  platforms: [
    'win8',
    'ios8',
    'android',
    'androidL',
    'flat'
  ]
};

var
  platforms = config.i8Api.platforms;

platforms.forEach(function(platform) {
  var
    urlResolver = function(icons) {
      var
        params = {
          platform: platform
        },
        options = {
          url: config.i8Api.apiGateway.url,
          params: params
        }
        ;

      if (icons) {
        if (!Array.isArray(icons)) {
          icons = [icons];
        }
        params.icons = icons.join(',');
      }

      return options;
    },
    options = {
      cumulative: true
    };

  iconManager.registerIconSet(platform, urlResolver, options);
});

iconManager.setDefaultIconSetId('flat');
