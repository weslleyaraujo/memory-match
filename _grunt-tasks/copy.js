module.exports = function(grunt) {
  'use strict';

  grunt.config('copy', {
    all: {
      expand: true,
      cwd: 'src/fonts/',
      src: '**',
      dest: 'dist/fonts',
    }
  });

  grunt.registerTask('copy', function() {
    grunt.task.run(['copy']);
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

};
