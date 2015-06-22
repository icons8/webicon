
module.exports = function(config) {
  var
    dependencies,
    tests;

  tests = [
    'test/angular/extensions/**/*.spec.js',
    'test/jquery/extensions/**/*.spec.js'
  ];

  dependencies = [
    'node_modules/jasmine-ajax/lib/mock-ajax.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/angular/angular.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'dist/angular-webicon-core.js',
    'dist/jquery-webicon-core.js',
    'dist/extensions/!(*.min.js)*.js'
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