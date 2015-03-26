'use strict';

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var SVGSpriter = require('svg-sprite');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var yargs = require('yargs');

var argv = yargs
  .usage('Usage: $0 ' +
  '[--debug] ' +
  '')
  .argv;

var isDebug = function () {
  return typeof argv.debug == 'undefined' || argv.debug;
};

var getCommonPattern = function(i8ApiExcluded) {
  var
    pattern = [
      'core/**/*([!.]).js',
      'extensions/**/*([!.]).js'
    ];
  if (isDebug()) {
    pattern.push(
      'core/**/*.debug.js',
      'extensions/**/*.debug.js'
    )
  }
  if (i8ApiExcluded) {
    pattern.push(
      '!extensions/i8Api/**/*.js'
    )
  }
  return pattern;
};

gulp.task('angular-module', function() {
  var
    stream,
    pattern = [].concat(
      'angular/module/module.prefix',
      getCommonPattern(),
      'angular/*.js',
      'angular/module/*.js',
      'angular/module/module.js',
      'angular/module/module.suffix'
    );

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
    pattern = [].concat(
      'angular/module/module.prefix',
      getCommonPattern(true),
      'angular/*.js',
      'angular/module/*.js',
      'angular/module/module.js',
      'angular/module/module.suffix'
    );

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
    pattern = [].concat(
      'jquery/plugin/plugin.prefix',
      getCommonPattern(),
      'jquery/*.js',
      'jquery/plugin/*.js',
      'jquery/plugin/plugin.js',
      'jquery/plugin/plugin.suffix'
    );

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
    pattern = [].concat(
      'jquery/plugin/plugin.prefix',
      getCommonPattern(true),
      'jquery/*.js',
      'jquery/plugin/*.js',
      'jquery/plugin/plugin.js',
      'jquery/plugin/plugin.suffix'
    );

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
  runSequence(['angular-module', 'angular-module-core', 'jquery-plugin', 'jquery-plugin-core'], done);
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
  var options = {
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
            mode: {}
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
  runSequence('clean', 'scripts', 'styles', done);
});

gulp.task('default', function(done) {
  runSequence('clean', 'scripts', 'styles', ['watch', 'demo-server'], done);
});
