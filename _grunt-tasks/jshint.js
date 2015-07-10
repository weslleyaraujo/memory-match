module.exports = function(grunt) {
  'use strict';

  grunt.config('jshint', {
    options: {
      debug: true
    },
    all: {
      src: [
        'Gruntfile.js',
        'src/js/**/*.js',
        'src/js/*.js',
        '!src/js/vendor/**/*.js',
      ]
    },
    specific: {
      options: {
        debug: true,
        expr: true
      },
      src: []
    }
  });

  grunt.registerTask('jshint', function() {
    grunt.task.run(['jshint']);
  });

  grunt.event.on('watch', function(action, filepath) {
    grunt.config('jshint.specific.src', filepath);
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

};
