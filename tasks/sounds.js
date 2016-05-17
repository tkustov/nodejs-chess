var gulp = require('gulp');
var config = require('../config');

gulp.task('sounds', function() {
  return gulp.src(config.sounds.src)
    .pipe(gulp.dest(config.sounds.dest));
});
