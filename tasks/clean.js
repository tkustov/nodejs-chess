var gulp = require('gulp');
var del = require('del');
var config = require('../config');

gulp.task('clean', () => {
  return del([config.target]);
});
