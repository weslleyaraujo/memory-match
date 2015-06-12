module.exports = function (grunt) {
  'use strict';

  var tasks = [
    'grunt-contrib-compass',
    'grunt-contrib-jshint',
    'grunt-contrib-watch',
    'grunt-contrib-connect'
  ],

  config = {};

  // jshint
  config.jshint = {
    all: {
      src: [
        'Gruntfile.js',
        'src/*.js'
      ]
    }
  };

  // compass
  config.compass = {
    all: {
      options: {
        specify: [
          'src/sass/main.sass'
        ],
        sassDir: 'src/sass',
        cssDir: 'dist/css',
        outputStyle: 'nested',
        environment: 'development'
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
      tasks: ['compass:all']
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

  // config
  grunt.initConfig(config);

  // load tasks
  tasks.forEach(grunt.loadNpmTasks);

  // tasks
  grunt.registerTask('develop', [
    'compass:all',
    'connect',
    'watch'
  ]);

};
