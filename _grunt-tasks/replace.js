/*
 * FIXME: Think in some smarter way to do this
 */
module.exports = function(grunt) {
  'use strict';

  var CONFIG_FILE = grunt.file.readJSON('config-production.json');

  grunt.config('replace', {
    dist: {
      options: {
        patterns: [
          {
            match: /\/src\/fonts\//g,
            replacement: CONFIG_FILE.fonts.src
          }
        ]
      },
      files: [
        {
          expand: true,
          flatten: true,
          src: ['dist/css/*.css'],
          dest: 'dist/css/'
        }
      ]
    }
  });

  grunt.registerTask('replace', function() {
    grunt.task.run(['replace']);
  });

  grunt.loadNpmTasks('grunt-replace');

};
