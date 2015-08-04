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
    ejs: {
      files: [
        'src/*.html',
      ],
      tasks: ['render']
    }
  });

  grunt.registerTask('watch', function() {
    grunt.task.run(['watch']);
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

};
