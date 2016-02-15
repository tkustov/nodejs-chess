var gulp = require('gulp');

gulp.task('build', ['js', 'partials', 'less'], () => {
  gulp.start('html');
});
