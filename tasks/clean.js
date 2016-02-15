var gulp = require('gulp');
var del = require('del');
var config = require('../config');

gulp.task('clean', ['server-clean', 'client-clean'], () => {
  return del([config.target]);
});
