'use strict';

var config = require('../config');
var gulp = require('gulp');

gulp.task('dev', ['watch', 'browser-sync']);
