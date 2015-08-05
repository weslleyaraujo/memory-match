module.exports = function(grunt) {
  'use strict';

  var CONFIG = 'config' + (grunt.option('config') ? '-' + grunt.option('config') : '-development') + '.json';

  grunt.config('render', {
    app: {
      options: {
        data: {
          config: grunt.file.readJSON(CONFIG)
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
