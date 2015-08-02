module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('develop', [
    'jshint:all',
    'sass',
    'postcss',
    'copy',
    'connect',
    'watch'
  ]);

};
