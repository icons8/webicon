
config.icons8Api = {
  apiGateway: {
    url: '//localhost:3452/icon-sets'
  }
};

['win8', 'ios8', 'android', 'androidL', 'flat'].forEach(function(platform) {
  var
    urlResolver = function(icons) {
      return {
        url: config.icons8Api.apiGateway.url,
        params: {
          platform: platform,
          icons: icons.join(',')
        }
      };
    },
    options = {
      cumulative: true
    };

  iconManager.registerIconSet(platform, urlResolver, options);
});

