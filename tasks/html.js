var path = require('path');
var gulp = require('gulp');
var inject = require('gulp-inject');
var config = require('../config');

gulp.task('html', ['js', 'partials', 'less'], () => {
  return gulp.src(config.html.src).
    pipe(inject(
      gulp.src(config.html.files, { read: false, cwd: config.assets }),
      {
        addRootSlash: false,
        addPrefix: path.relative(config.target, config.assets)
      }
    )).
    pipe(gulp.dest(config.target));
});
