
module.exports = function(config) {
  var
    dependencies,
    tests;

  tests = [
    'test/extensions/**/*.spec.js'
  ];

  dependencies = [
    'node_modules/jasmine-ajax/lib/mock-ajax.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/angular/angular.js',
    'node_modules/angular-mocks/angular-mocks.js'
  ];

  if (process.env.KARMA_TEST_EXTENSIONS_SEPARATED) {
    dependencies.push(
      'dist/angular-i8-icon-core.js',
      'dist/jquery-i8-icon-core.js',
      'dist/i8-icon-extensions.js'
    )
  }
  else {
    dependencies.push(
      'dist/angular-i8-icon.js',
      'dist/jquery-i8-icon.js'
    )
  }

  config.set({

    basePath: __dirname + '/..',
    frameworks: ['jasmine'],
    files: dependencies.concat(tests),

    port: 9876,
    reporters: ['mocha'],
    colors: true,

    autoWatch: false,
    singleRun: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome']
  });

};