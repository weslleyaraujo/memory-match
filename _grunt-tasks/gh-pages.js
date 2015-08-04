module.exports = function(grunt) {
  'use strict';

  grunt.config('gh-pages', {
    options: {
      base: 'dist'
    },
    src: ['**']
  });

  grunt.registerTask('gh-pages', function() {
    grunt.task.run(['gh-pages']);
  });

  grunt.loadNpmTasks('grunt-gh-pages');

};
