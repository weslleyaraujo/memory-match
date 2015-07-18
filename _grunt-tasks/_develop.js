module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('develop', [
    'sass',
    'postcss',
    'jshint:all',
    'copy',
    'connect',
    'watch'
  ]);

};
