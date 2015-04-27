
module.exports = function(config) {
  var
    dependencies,
    tests;

  tests = [
    'test/angular/**/*.spec.js'
  ];

  dependencies = [
    'node_modules/angular/angular.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'dist/angular-i8-icon.js'
  ];

  if (process.env.KARMA_TEST_ANGULAR_WITH_JQUERY) {
    dependencies.unshift(
      'node_modules/jquery/dist/jquery.js'
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