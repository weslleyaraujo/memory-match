module.exports = function(grunt) {
  'use strict';

  grunt.config('postcss', {
    options: {
      map: true,
      processors: [
        require('autoprefixer-core')({
          browsers: 'last 4 versions'
        }),
        require('csswring')
      ]
    },
    dist: {
      src: 'dist/css/*.css'
    }
  });

  grunt.registerTask('postcss', function() {
    grunt.task.run(['postcss']);
  });

  grunt.loadNpmTasks('grunt-postcss');

};
