'use strict';

var config = require('../config');
var gulp = require('gulp');


gulp.task('copy-index', ['clean'], function() {
  gulp.src([
    config.src + '/index.html'
  ]).pipe(gulp.dest(config.dist));
});


gulp.task('copy', ['copy-index']);
