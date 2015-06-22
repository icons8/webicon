
module.exports = function(config) {
  var
    dependencies,
    tests;

  tests = [
    'test/angular/core/**/*.spec.js'
  ];

  dependencies = [
    'node_modules/angular/angular.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'dist/angular-webicon-core.js'
  ];

  config.set({

    basePath: __dirname + '/..',
    frameworks: ['jasmine'],
    files: dependencies.concat(tests),

    port: 9876,
    reporters: ['mocha'],
    colors: true,

    autoWatch: false,
    singleRun: true,

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