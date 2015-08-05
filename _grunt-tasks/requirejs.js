module.exports = function(grunt) {
  'use strict';

  grunt.config('requirejs', {
    compile: {
      options: {
        baseUrl: 'src/js/',
        mainConfigFile: 'src/js/main.js',
        name: 'app',
        out: 'dist/js/main.min.js',
        include: ['main'],
        preserveLicenseComments: false
      }
    }
  });

  grunt.registerTask('requirejs', function() {
    grunt.task.run(['requirejs']);
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');

};
