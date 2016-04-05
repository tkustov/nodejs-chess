var path = require('path');
var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('../config');

gulp.task('images', function() {
    var imgSrc = '../lib/client/assets/images',
        imgDst = './images';

    return gulp.src(imgSrc)
        .pipe(gulp.dest(imgDst));
});