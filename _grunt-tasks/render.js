module.exports = function(grunt) {
  'use strict';

  grunt.config('render', {
    app: {
      options: {
        data: {
          config: grunt.file.readJSON('config.json')
        },
      },

      files: {
        'index.html': ['src/index.html']
      }
    }
  });

  grunt.registerTask('ejs-render', function() {
    grunt.task.run(['ejs-render']);
  });

  grunt.loadNpmTasks('grunt-ejs-render');

};
