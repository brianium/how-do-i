'use strict';

var config = require('../config');
var gulp = require('gulp');
var inject = require('gulp-inject');

gulp.task('inject', ['clean', 'browserify', 'copy'], function() {
  var sources = gulp.src([
    config.dist + '/**/*.css',
    config.dist + '/main.js'
  ], {read: false});
  return gulp.src(config.dist + '/index.html')
     .pipe(inject(sources, config.inject))
     .pipe(gulp.dest(config.dist));
});
