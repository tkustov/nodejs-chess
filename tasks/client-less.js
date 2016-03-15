var gulp = require('gulp');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var sourceMaps = require('gulp-sourcemaps');
var gif = require('gulp-if');
var rename = require('gulp-rename');
var config = require('../config').client;
var debug = process.env.NODE_ENV !== 'production';

gulp.task('client-less', ['client-clean'], () => {
  return gulp.src(config.less.src).
    pipe(rename(config.less.dest)).
    pipe(sourceMaps.init()).
      pipe(less()).
      pipe(cleanCss()).
    pipe(sourceMaps.write('.')).
    pipe(gulp.dest(config.assets));
});
