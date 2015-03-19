'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var SVGSpriter = require('svg-sprite');
var fs = require('fs');
var path = require('path');

var connectOptions = {
  port: 3452
};
var apiIconSetsUrl = '/icon-sets';
var assetsIconsSvgPath = './assets/icons/svg';

gulp.task('connect', function() {
  var options = connectOptions;

  options.middleware = function(connect, options) {
    var list = [];
    list.push(connect.responseTime());
    list.push(connect.query());
    list.push(connect.urlencoded());
    list.push(connect.json());

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
  runSequence('connect', done);
});

gulp.task('default', function(done) {
  runSequence('build', done);
});
