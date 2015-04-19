'use strict';

var config = require('../config');
var gulp = require('gulp');

gulp.task('watch', ['build', 'browser-sync'], function() {
  return gulp.watch(config.watch.paths, ['build', 'browser-reload']);
});
