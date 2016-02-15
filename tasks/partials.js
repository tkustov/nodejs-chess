var gulp = require('gulp');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var config = require('../config');

gulp.task('partials', () => {
  return gulp.src('**/*.html', { cwd: config.partials.src }).
    pipe(templateCache({
      module: config.partials.module,
      standalone: false,
      moduleSystem: 'IIFE'
    })).
    pipe(rename(config.partials.dest)).
    pipe(gulp.dest(config.assets));
});
