module.exports = function(grunt) {
  'use strict';

  grunt.config('uglify', {
    app: {
      files: {
        'dist/js/require.min.js' : ['src/js/vendor/requirejs/require.js']
      }
    }
  });

  grunt.registerTask('uglify', function() {
    grunt.task.run(['uglify']);
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

};
