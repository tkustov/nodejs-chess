var gulp = require('gulp');
var del = require('del');
var config = require('../config').client;

gulp.task('client-clean', () => {
  return del([config.target]);
});
