module.exports = function(grunt) {
  'use strict';

  grunt.config('connect', {
    server: {
      options: {
        port: 8180,
        base: '.'
      }
    }
  });

  grunt.registerTask('connect', function() {
    grunt.task.run(['connect']);
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

};
