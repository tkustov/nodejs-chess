var gulp = require('gulp');
var gUtil = require('gulp-util');
var sourceMaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var watchify = require('watchify');
var envify = require('envify/custom');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var config = require('../config');

gulp.task('js-watch', () => {
  var stream = browserify({
      entries: config.js.src,
      cache: {},
      packageCache: {},
      plugin: [watchify],
      debug: true
    }).
    transform(envify(Object.assign({ _: 'purge' }, config.env)), { global: true });

  stream.on('update', bundle);
  stream.on('log', gUtil.log);
  stream.on('error', gUtil.log.bind(gUtil, 'browserify error'));
  return bundle();

  function bundle() {
    return stream.bundle().
      pipe(source(config.js.dest)).
      pipe(buffer()).
      pipe(sourceMaps.init({ loadMaps: true })).
      pipe(sourceMaps.write('./')).
      pipe(gulp.dest(config.assets));
  }
});
