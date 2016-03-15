var gulp = require('gulp');

gulp.task('client', [
  'client-js',
  'client-partials',
  'client-less',
  'client-html'
]);
