var gulp = require('gulp');
var del = require('del');
var config = require('../config').server;

gulp.task('server-clean', () => {
  return del([config.target]);
});
