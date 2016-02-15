var path = require('path');
var gulp = require('gulp');
var gif = require('gulp-if');
var uglify = require('gulp-uglify');
var sourceMaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var envify = require('envify/custom');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var config = require('../config');
var debug = process.env.NODE_ENV !== 'production';

gulp.task('js', () => {
  return browserify({ entries: [config.js.src], debug: true }).
    transform(envify({ _: 'purge', NODE_ENV: 'development' }), { global: true }).
    bundle().
    pipe(source(path.basename(config.js.dest))).
    pipe(buffer()).
    pipe(sourceMaps.init({ loadMaps: true })).
      pipe(gif(!debug, uglify())).
    pipe(sourceMaps.write('.')).
    pipe(gulp.dest(config.assets));
});
