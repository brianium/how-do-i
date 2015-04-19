'use strict';
var gulp = require('gulp');

gulp.task('build', ['browserify', 'inject']);
gulp.task('default', ['build']);
