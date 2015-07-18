module.exports = function(grunt) {
  'use strict';

  grunt.config('watch', {
    sass: {
      files: [
        'src/sass/*.sass',
        'src/sass/**/*.sass',
        'src/fonts/**/*.scss'
      ],
      tasks: ['sass', 'postcss']
    },
    js: {
      files: [
        'src/js/*.js',
      ],
      tasks: [''] // some task
    }
  });

  grunt.registerTask('watch', function() {
    grunt.task.run(['watch']);
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

};
