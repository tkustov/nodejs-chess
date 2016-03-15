var path = require('path');
var gulp = require('gulp');
var gif = require('gulp-if');
var uglify = require('gulp-uglify');
var sourceMaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var envify = require('envify/custom');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var config = require('../config').client;
var debug = process.env.NODE_ENV !== 'production';

gulp.task('client-js', ['client-clean'], () => {
  return browserify({ entries: [config.js.src], debug: true }).
    transform(babelify, { presets: ['es2015'] }).
    transform(envify({ _: 'purge', NODE_ENV: 'development' }), { global: true }).
    bundle().
    pipe(source(path.basename(config.js.dest))).
    pipe(buffer()).
    pipe(sourceMaps.init({ loadMaps: true })).
      pipe(gif(!debug, uglify())).
    pipe(sourceMaps.write('.')).
    pipe(gulp.dest(config.assets));
});
