module.exports = function (grunt) {
  'use strict';

  var tasks = [
    'grunt-sass',
    'grunt-postcss',
    'grunt-contrib-jshint',
    'grunt-contrib-watch',
    'grunt-contrib-connect',
    'grunt-contrib-concat'
  ],

  config = {};

  // jshint
  config.jshint = {
    all: {
      src: [
        'Gruntfile.js',
        'src/js/*.js'
      ]
    },
    specific: {
      options: {
        debug: true,
        expr: true
      },
      src: []
    }
  };

  // sass
  config.sass = {
    options: {
      sourceMap: true
    },
    dist: {
      files: {
        'dist/css/main.css': 'src/sass/main.sass'
      }
    }
  };

  // watch
  config.watch = {
    sass: {
      files: [
        'src/sass/*.sass',
        'src/sass/*.scss', // remove it after solve map .sass issue
        'src/sass/**/*.sass'
      ],
      tasks: ['sass', 'postcss']
    },
    js: {
      files: [
        'src/js/*.js',
      ],
      tasks: ['concat:js']
    }
  };

  // postcss
  config.postcss = {
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
  };

  // connect
  config.connect = {
    server: {
      options: {
        port: 8180,
        base: '.'
      }
    }
  };

  // concat
  config.concat = {
    js: {
      src: [
        'src/js/helpers.js',
        'src/js/field.js',
        'src/js/memory-match.js',
        'src/js/app.js'
      ],

      dest: 'dist/js/application.js'
    }
  };

  // config
  grunt.initConfig(config);

  // load tasks
  tasks.forEach(grunt.loadNpmTasks);

  // tasks
  grunt.registerTask('develop', [
    'sass',
    'postcss',
    'jshint:all',
    'concat:js',
    'connect',
    'watch'
  ]);

  grunt.event.on('watch', function(action, filepath) {
    grunt.config('jshint.specific.src', filepath);
  });

};
