module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('build', [
    'jshint:all',
    'sass',
    'postcss',
    'copy',
    'requirejs',
    'uglify',
  ]);

};
