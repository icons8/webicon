
var jadeInstance = require('jade');
var gulp = require('gulp');
var gif = require('gulp-if');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var yargs = require('yargs');

var argv = yargs.argv;

var getDist = function() {
  return argv.dist || '..';
};
var isWatch = function() {
  return typeof argv.watch == 'undefined' || argv.watch
};

jadeInstance.filters.code = function(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/#/g, '&#35;')
    .replace(/\n/g, '<br/>');
};

gulp.task('styles', function() {
  return gulp.src(['styles/**/*.scss', '!styles/**/_*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(getDist()))
  ;
});

gulp.task('scripts', function() {
  return gulp.src('scripts/**/*.js')
    .pipe(gulp.dest(getDist()))
    ;
});

gulp.task('pages', function() {
  return gulp.src(['pages/**/*.jade', '!pages/**/_*.jade'])
    .pipe(plumber())
    .pipe(jade({ jade: jadeInstance }))
    .pipe(gulp.dest(getDist()))
  ;
});

gulp.task('default', ['pages', 'styles', 'scripts'], function() {
  if (isWatch()) {
    gulp.watch(['pages/**'], ['pages']);
    gulp.watch(['styles/**'], ['styles']);
    gulp.watch(['scripts/**/*.js'], ['scripts']);
  }
});
