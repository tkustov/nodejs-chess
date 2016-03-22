var path = require('path');
var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('../config');

gulp.task('start', ['build', 'js-watch'], () => {
  gulp.watch('**/*.html', { cwd: config.partials.src }, ['partials']);
  gulp.watch('**/*.less', { cwd: path.dirname(config.less.src) }, ['less']);
  connect.server({
    root: config.target
  });
});
