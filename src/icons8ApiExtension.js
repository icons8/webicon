
config.i8Api = {
  apiGateway: {
    url: '//localhost:3452/icon-sets'
  }
};

iconManager
  .setDefaultIconSetId('i8')
  .registerIconSet(
    'i8',
    function(icons) {
      var
        options = {
          url: config.i8Api.apiGateway.url,
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
      cumulative: true
    }
  );

