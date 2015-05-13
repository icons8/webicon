'use strict';

var
  fs = require('fs'),
  path = require('path'),
  gulp = require('gulp'),
  rename = require('gulp-rename'),
  connect = require('gulp-connect'),
  runSequence = require('run-sequence'),
  SVGSpriter = require('svg-sprite'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  yargs = require('yargs'),
  karma = require('karma').server,
  Promise = require('bluebird');

var
  argv = yargs
  .usage('Usage: $0 ' +
  '[--debug] ' +
  '')
  .argv;

function isDebug() {
  return typeof argv.debug == 'undefined' || argv.debug;
}

function getTestBrowsers() {
  var
    browsers = argv.browsers || argv.browser;

  return browsers
    ? browsers.trim().split(',')
    : ['PhantomJS'];
}

function getCorePattern() {
  var
    pattern = [
      'core/**/!(*.debug.js)*.js'
    ];
  if (isDebug()) {
    pattern.push(
      'core/**/*.debug.js'
    )
  }
  return pattern;
}

function getCoreAngularPattern(patterns) {
  return [].concat(
    'angular/module/module.prefix',
    getCorePattern(),
    'angular/*.js',
    'angular/module/!(module.js)*.js',
    patterns || [],
    'angular/module/module.js',
    'angular/module/module.suffix'
  );
}

function getCoreJqueryPattern(patterns) {
  return [].concat(
    'jquery/plugin/plugin.prefix',
    getCorePattern(),
    'jquery/*.js',
    'jquery/plugin/!(plugin.js)*.js',
    patterns || [],
    'jquery/plugin/plugin.js',
    'jquery/plugin/plugin.suffix'
  );
}

function getExtensionPattern(separate) {
  var
    pattern = [];

  if (separate) {
    pattern.push(
      'extensions/extensions.prefix'
    );
  }
  pattern.push(
    'extensions/**/!(extensions-*.js|extension.js|*.debug.js)*.js'
  );
  if (isDebug()) {
    pattern.push(
      'extensions/**/*.debug.js'
    )
  }
  pattern.push(
    'extensions/**/extension.js'
  );
  if (separate) {
    pattern.push(
      'extensions/extensions-separated.js',
      'extensions/extensions.suffix'
    );
  }
  else {
    pattern.push(
      'extensions/extensions-embedded.js'
    );
  }
  return pattern;
}

gulp.task('extensions', function() {
  var
    stream,
    pattern = getExtensionPattern(true);

  stream = gulp.src(pattern, { cwd: 'src' })
    .pipe(plumber())
    .pipe(concat('i8-icon-extensions.js'))
    .pipe(gulp.dest('.', { cwd: 'dist' }));

  if (!isDebug()) {
    stream = stream
      .pipe(rename({ suffix: ".min" }))
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('.', { cwd: 'dist' }))
  }

  return stream;
});

gulp.task('angular-module', function() {
  var
    stream,
    pattern = getCoreAngularPattern(getExtensionPattern());

  stream = gulp.src(pattern, { cwd: 'src' })
    .pipe(plumber())
    .pipe(concat('angular-i8-icon.js'))
    .pipe(gulp.dest('.', { cwd: 'dist' }));

  if (!isDebug()) {
    stream = stream
      .pipe(rename({ suffix: ".min" }))
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('.', { cwd: 'dist' }))
  }

  return stream;
});

gulp.task('angular-module-core', function() {
  var
    stream,
    pattern = getCoreAngularPattern();

  stream = gulp.src(pattern, { cwd: 'src' })
    .pipe(plumber())
    .pipe(concat('angular-i8-icon-core.js'))
    .pipe(gulp.dest('.', { cwd: 'dist' }));

  if (!isDebug()) {
    stream = stream
      .pipe(rename({ suffix: ".min" }))
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('.', { cwd: 'dist' }))
  }

  return stream;
});

gulp.task('jquery-plugin', function() {
  var
    stream,
    pattern = getCoreJqueryPattern(getExtensionPattern());

  stream = gulp.src(pattern, { cwd: 'src' })
    .pipe(plumber())
    .pipe(concat('jquery-i8-icon.js'))
    .pipe(gulp.dest('.', { cwd: 'dist' }));

  if (!isDebug()) {
    stream = stream
      .pipe(rename({ suffix: ".min" }))
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('.', { cwd: 'dist' }))
  }

  return stream;
});

gulp.task('jquery-plugin-core', function() {
  var
    stream,
    pattern = getCoreJqueryPattern();

  stream = gulp.src(pattern, { cwd: 'src' })
    .pipe(plumber())
    .pipe(concat('jquery-i8-icon-core.js'))
    .pipe(gulp.dest('.', { cwd: 'dist' }));

  if (!isDebug()) {
    stream = stream
      .pipe(rename({ suffix: ".min" }))
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('.', { cwd: 'dist' }))
  }

  return stream;
});

gulp.task('scripts', function(done) {
  runSequence(['angular-module', 'angular-module-core', 'jquery-plugin', 'jquery-plugin-core', 'extensions'], done);
});

gulp.task('test-jquery', function(done) {
  var
    karmaConfig = {
      singleRun: true,
      autoWatch: false,
      browsers: getTestBrowsers(),
      configFile: __dirname + '/config/karma-jquery.conf.js'
    };

  karma.start(karmaConfig, function() {
    done();
  });

});

gulp.task('test-angular', function(done) {
  var
    karmaConfig = {
      singleRun: true,
      autoWatch: false,
      browsers: getTestBrowsers(),
      configFile: __dirname + '/config/karma-angular.conf.js'
    };

  karma.start(karmaConfig, function() {
    done()
  });
});

gulp.task('test-extensions', function(done) {
  var
    karmaConfig = {
      singleRun: true,
      autoWatch: false,
      browsers: getTestBrowsers(),
      configFile: __dirname + '/config/karma-extensions.conf.js'
    };

  karma.start(karmaConfig, function() {
    done();
  });

});

gulp.task('test-angular-extra', function(done) {
  var
    karmaConfig = {
      singleRun: true,
      autoWatch: false,
      browsers: getTestBrowsers(),
      configFile: __dirname + '/config/karma-angular.conf.js'
    },
    start = function() {
      return new Promise(function(resolve) {
        karma.start(karmaConfig, function() {
          resolve();
        });
      });
    };

  Promise.resolve()
    .then(function() {
      process.env.KARMA_TEST_ANGULAR_CORE = true;
      return start();
    })
    .then(function() {
      process.env.KARMA_TEST_ANGULAR_CORE = undefined;
      process.env.KARMA_TEST_ANGULAR_WITH_JQUERY = true;
      return start();
    })
    .then(function() {
      process.env.KARMA_TEST_ANGULAR_CORE = true;
      return start();
    })
    .then(function() {
      process.env.KARMA_TEST_ANGULAR_CORE = undefined;
      process.env.KARMA_TEST_ANGULAR_WITH_JQUERY = undefined;
      done();
    })
  ;

});

gulp.task('test-jquery-extra', function(done) {
  var
    karmaConfig = {
      singleRun: true,
      autoWatch: false,
      browsers: getTestBrowsers(),
      configFile: __dirname + '/config/karma-jquery.conf.js'
    },
    start = function() {
      return new Promise(function(resolve) {
        karma.start(karmaConfig, function() {
          resolve();
        });
      });
    };

  Promise.resolve()
    .then(function() {
      process.env.KARMA_TEST_JQUERY_CORE = true;
      return start();
    })
    .then(function() {
      process.env.KARMA_TEST_JQUERY_CORE = undefined;
      done();
    })
  ;

});

gulp.task('test-extensions-extra', function(done) {
  var
    karmaConfig = {
      singleRun: true,
      autoWatch: false,
      browsers: getTestBrowsers(),
      configFile: __dirname + '/config/karma-extensions.conf.js'
    },
    start = function() {
      return new Promise(function(resolve) {
        karma.start(karmaConfig, function() {
          resolve();
        });
      });
    };

  Promise.resolve()
    .then(function() {
      process.env.KARMA_TEST_EXTENSIONS_SEPARATED = true;
      return start();
    })
    .then(function() {
      process.env.KARMA_TEST_EXTENSIONS_SEPARATED = undefined;
      done();
    })
  ;

});


gulp.task('test', function(done) {
  runSequence('test-jquery', 'test-jquery-extra', 'test-angular', 'test-angular-extra', 'test-extensions', 'test-extensions-extra', done);
});

gulp.task('styles', function() {
  return gulp.src('**/*.css', { cwd: 'src' })
    .pipe(gulp.dest('.', { cwd: 'dist' }))
});

gulp.task('clean', function(done) {
  var
    pattern = [
      'dist/*',
      '!dist/.git*'
    ];
  del(pattern, done);
});


gulp.task('watch', function() {
  gulp.watch('src/**', ['scripts', 'styles']);
});

gulp.task('demo-server', function() {
  var
    options = {
      port: 3452,
      root: ['demo', '.']
    };

  options.middleware = function(connect, options) {
    return [
      connect.query(),
      function(req, res, next) {
        var
          url = '/icon-sets',
          iconsAssetsPath = 'assets/icons/svg',
          icons,
          mode,
          spriterConfig,
          spriter;

        if (req._parsedUrl.pathname.toLowerCase() === url) {
          icons = (req.query.icons || req.query.i || '').split(/[,|;]/g);
          mode = (req.query.mode || req.query.m || 'symbol').split(/[,|;]/g);
          spriterConfig = {
            mode: {},
            transform: []
          };
          mode.forEach(function(m) {
            spriterConfig.mode[m] = true;
          });
          mode = mode[0];
          spriter = new SVGSpriter(spriterConfig);

          icons.forEach(function(name) {
            var
              parts,
              prefixIconName,
              iconName,
              filename,
              virtualIconPath;

            parts = name.split('-');
            iconName = parts.slice(1).join('-');
            prefixIconName = parts.slice(0, 1);
            filename = path.join(iconsAssetsPath, iconName + '.svg');

            parts = path.resolve(filename).split(path.sep);
            virtualIconPath = parts.slice(0, -1).concat(prefixIconName + '-' + parts.slice(-1)).join(path.sep);
            if (fs.existsSync(filename)) {
              spriter.add(
                virtualIconPath,
                null,
                fs.readFileSync(filename, {encoding: 'utf-8'})
              );
            }
          });

          spriter.compile(function(error, result, data){
            if (error) {
              res.setHeader('Content-Type', 'text/plain; charset=utf-8');
              res.statusCode = 500;
              res.end(error + '');
              return;
            }
            try {
              res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
              res.statusCode = 200;
              res.end(result[mode].sprite.contents.toString('utf8'));
            }
            catch(e) {
              res.setHeader('Content-Type', 'text/plain; charset=utf-8');
              res.statusCode = 500;
              res.end(e + '');
            }

          });

          return;
        }
        next();
      }
    ];

  };

  connect.server(options);
});

gulp.task('build', function(done) {
  runSequence('clean', 'scripts', 'styles', 'test', done);
});

gulp.task('default', function(done) {
  runSequence('clean', 'scripts', 'styles', ['watch', 'demo-server'], done);
});
