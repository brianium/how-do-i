'use strict';

var lib = 'src/scripts';
var src = 'src';

module.exports = {
  src: src,
  lib: lib,
  main: lib + '/main.js',
  dist: 'dist',
  watch: {
    paths: ['js'].reduce(function(paths, ext) {
      return paths.concat([lib + '/**/*.' + ext, lib + '/*.' + ext]);
    }, [])
  },
  inject: {
    addRootSlash: true,
    relative: true
  },
  browserSync: {
    server: {
      baseDir: 'dist',
      index: 'index.html'
    }
  }
};
