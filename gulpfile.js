'use strict';

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var SVGSpriter = require('svg-sprite');
var concat = require('gulp-concat');
var jsmin = require('jsmin').jsmin;
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');

var connectOptions = {
  port: 3452
};
var apiIconSetsUrl = '/icon-sets';
var assetsIconsSvgPath = './assets/icons/svg';

var buildManifestPath = './build/manifest.json';
var distPath = './dist';

var readJsonFile = function(filename) {
  try {
    return fs.existsSync(filename) ? JSON.parse(jsmin(fs.readFileSync(filename) + '')) : undefined;
  }
  catch(e) {
    gutil.log(e);
    return null;
  }
};

gulp.task('scripts', function() {
  var
    tasks = [],
    manifest = readJsonFile(buildManifestPath) || {};

  function getFilesForDist(name, files) {
    var
      config = manifest[name],
      index;

    files = files || [];

    Array.prototype.splice.apply(files, [0, 0].concat(config.files || []));
    if (config.cd) {
      for (index = 0; index < files.length; index++) {
        files[index] = path.join(config.cd, files[index]);
      }
    }

    return config.inherit
      ? getFilesForDist(config.inherit, files)
      : files
    ;
  }

  Object.keys(manifest)
    .filter(function(name) {
      return manifest[name].out;
    })
    .forEach(function(name) {
      var
        config = manifest[name],
        task;

      task = gulp.src(getFilesForDist(name))
        .pipe(plumber())
        .pipe(concat(config.out))
        .pipe(gulp.dest('.', { cwd: distPath }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.init())
          .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.', { cwd: distPath }))
      ;

      tasks.push(task);
    });

  if (!tasks.length) {
    return;
  }

  return merge(tasks);
});

gulp.task('connect', function() {
  var options = connectOptions;

  options.middleware = function(connect, options) {
    var list = [];
    list.push(connect.responseTime());
    list.push(connect.query());

    list.push(
      function(req, res, next) {
        var
          url = apiIconSetsUrl,
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
            filename = path.join(assetsIconsSvgPath, iconName + '.svg');

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
    );

    return list;
  };

  connect.server(options);
});

gulp.task('build', function(done) {
  runSequence('scripts', done);
});

gulp.task('default', function(done) {
  runSequence('connect', done);
});
