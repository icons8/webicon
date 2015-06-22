'use strict';

var
  fs = require('fs'),
  path = require('path'),
  gulp = require('gulp'),
  rename = require('gulp-rename'),
  connect = require('gulp-connect'),
  runSequence = require('run-sequence'),
  cheerio = require('cheerio'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  plumber = require('gulp-plumber'),
  merge = require('merge-stream'),
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  yargs = require('yargs'),
  karma = require('karma').server;

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

function getExtensionPattern(list, separated) {
  var
    pattern = [],
    listPattern;

  list = list || [];
  if (!Array.isArray(list)) {
    list = [list];
  }

  switch(list.length) {
    case 0:
      listPattern = '*';
      break;
    case 1:
      listPattern = list[0];
      break;
    default:
      listPattern = '{' + list.join(',') + '}';
  }

  if (separated) {
    pattern.push(
      'extensions/extension.prefix'
    );
  }
  pattern.push(
    'extensions/' + listPattern + '/!(extension.js|*.debug.js)*.js'
  );
  if (isDebug()) {
    pattern.push(
      'extensions/' + listPattern + '/*.debug.js'
    )
  }
  pattern.push(
    'extensions/' + listPattern + '/extension.js'
  );
  if (separated) {
    pattern.push(
      'extensions/extension-separated.js',
      'extensions/extension.suffix'
    );
  }
  else {
    pattern.push(
      'extensions/extension-embedded.js'
    );
  }
  return pattern;
}

gulp.task('extensions', function() {
  var
    extensions,
    tasks;

  extensions = [
    'fontawesome',
    'glyphicons',
    'icons8',
    'welovesvg'
  ];

  tasks = extensions.map(function(name) {
    var
      stream,
      pattern;

    pattern = getExtensionPattern([name], true);

    stream = gulp.src(pattern, { cwd: 'src' })
      .pipe(plumber())
      .pipe(concat(name + '.js'))
      .pipe(gulp.dest('./extensions', { cwd: 'dist' }));

    if (!isDebug()) {
      stream = stream
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./extensions', { cwd: 'dist' }))
    }

    return stream;

  });

  return merge(tasks);
});

gulp.task('angular-module', function() {
  var
    stream,
    pattern = getCoreAngularPattern(getExtensionPattern(['icons8', 'welovesvg']));

  stream = gulp.src(pattern, { cwd: 'src' })
    .pipe(plumber())
    .pipe(concat('angular-webicon.js'))
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
    .pipe(concat('angular-webicon-core.js'))
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
    pattern = getCoreJqueryPattern(getExtensionPattern(['icons8', 'welovesvg']));

  stream = gulp.src(pattern, { cwd: 'src' })
    .pipe(plumber())
    .pipe(concat('jquery-webicon.js'))
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
    .pipe(concat('jquery-webicon-core.js'))
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

gulp.task('test-core-jquery', function(done) {
  var
    karmaConfig = {
      browsers: getTestBrowsers(),
      configFile: __dirname + '/config/karma-core-jquery.conf.js'
    };

  karma.start(karmaConfig, function() {
    done();
  });

});

gulp.task('test-core-angular', function(done) {
  var
    karmaConfig = {
      browsers: getTestBrowsers(),
      configFile: __dirname + '/config/karma-core-angular.conf.js'
    };

  karma.start(karmaConfig, function() {
    done()
  });
});

gulp.task('test-regular', function(done) {
  var
    karmaConfig = {
      browsers: getTestBrowsers(),
      configFile: __dirname + '/config/karma-regular.conf.js'
    };

  karma.start(karmaConfig, function() {
    done();
  });

});

gulp.task('test-extensions', function(done) {
  var
    karmaConfig = {
      browsers: getTestBrowsers(),
      configFile: __dirname + '/config/karma-extensions.conf.js'
    };

  karma.start(karmaConfig, function() {
    done();
  });

});


gulp.task('test', function(done) {
  runSequence('test-core-jquery', 'test-core-angular', 'test-regular', 'test-extensions', done);
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
          assetsPath = 'assets',
          flatColorIconSetPath = 'flat_color.svg',
          win8IconSetPath = 'win8.svg',
          icons,
          flatColorIconSetContext,
          win8IconSetContext,
          resultIconSetContext,
          y,
          viewBoxParts;

        if (req._parsedUrl.pathname.toLowerCase() === url) {
          icons = (req.query.icons || req.query.i || '').split(/[,|;]/g);

          flatColorIconSetContext = cheerio.load(
            fs.readFileSync(path.join(assetsPath, flatColorIconSetPath), {encoding: 'utf8'}),
            { xmlMode: true }
          );
          win8IconSetContext = cheerio.load(
            fs.readFileSync(path.join(assetsPath, win8IconSetPath), {encoding: 'utf8'}),
            { xmlMode: true }
          );
          resultIconSetContext = cheerio.load(
            '<svg xmlns="http://www.w3.org/2000/svg"></svg>',
            { xmlMode: true }
          );

          y = 0;
          icons.forEach(function(iconName) {
            var
              parts,
              platformIconName,
              shortIconName,
              iconElement = null;

            parts = iconName.split('-');
            shortIconName = parts.slice(1).join('-');
            platformIconName = parts.slice(0, 1)[0];

            switch(platformIconName) {
              case 'color':
                iconElement = flatColorIconSetContext('[id="' + shortIconName + '"]').eq(0);
                break;
              case 'win8':
                iconElement = win8IconSetContext('[id="' + shortIconName + '"]').eq(0);
                break;
            }

            if (iconElement && iconElement.length == 1) {
              viewBoxParts = iconElement.attr('viewBox').split(/\s+/);
              iconElement
                .attr('id', iconName)
                .attr('width', viewBoxParts[2])
                .attr('height', viewBoxParts[3])
                .attr('x', 0)
                .attr('y', y);

              y += parseFloat(viewBoxParts[3]);
              resultIconSetContext.root().children('svg').append(iconElement);
            }
            else {
              resultIconSetContext.root().children('svg').append(
                '<svg id="' + iconName + '" />'
              );
            }
          });

          res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
          res.statusCode = 200;
          res.end(resultIconSetContext.html());

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
