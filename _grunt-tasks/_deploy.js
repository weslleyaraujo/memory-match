module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('deploy', [
    'build',
    'gh-pages',
  ]);

};
