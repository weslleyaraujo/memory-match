module.exports = function(grunt) {
  'use strict';

  grunt.config('htmlmin', {
    dist: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      files: {
        'dist/index.html': 'index.html'
      }
    },
  });

  grunt.registerTask('htmlmin', function() {
    grunt.task.run(['htmlmin']);
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');

};
