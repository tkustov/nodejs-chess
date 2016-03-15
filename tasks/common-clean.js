var gulp = require('gulp');
var del = require('del');
var config = require('../config').common;

gulp.task('common-clean', () => {
  return del([config.target]);
});
