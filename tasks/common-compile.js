var gulp = require('gulp');
var babel = require('gulp-babel');
var config = require('../config').common;

gulp.task('common-compile', ['common-clean'], () => {
  return gulp.src('**/*.js', { cwd: config.src }).
    pipe(babel({ presets: ['es2015'] })).
    pipe(gulp.dest(config.target));
});
