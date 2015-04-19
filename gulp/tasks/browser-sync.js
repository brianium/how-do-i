'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var config = require('../config');

gulp.task('browser-sync', ['build'], function() {
  browserSync(config.browserSync);
});

gulp.task('browser-reload', ['build', 'inject'], function() {
  browserSync.reload();
});
