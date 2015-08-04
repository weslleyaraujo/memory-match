module.exports = function(grunt) {
  'use strict';

  grunt.config('copy', {
    fonts: {
      expand: true,
      cwd: 'src/fonts/',
      src: '**',
      dest: 'dist/fonts',
    },

    images: {
      expand: true,
      cwd: 'src/images/',
      src: '**',
      dest: 'dist/images',
    },

    html: {
      expand: true,
      cwd: 'src',
      src: '*.html',
      dest: '.',
    }
  });

  grunt.registerTask('copy', function() {
    grunt.task.run(['copy']);
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

};
