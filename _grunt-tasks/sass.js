module.exports = function(grunt) {
  'use strict';

  grunt.config('sass', {
    options: {
      sourceMap: true
    },
    dist: {
      files: {
        'dist/css/main.css': 'src/sass/main.sass'
      }
    }
  });

  grunt.registerTask('sass', function() {
    grunt.task.run(['sass']);
  });

  grunt.loadNpmTasks('grunt-sass');

};
