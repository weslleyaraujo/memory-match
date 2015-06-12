module.exports = function (grunt) {
  'use strict';

  var tasks = [
    'grunt-contrib-compass',
    'grunt-contrib-jshint'
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

  // config
  grunt.initConfig(config);

  // load tasks
  tasks.forEach(grunt.loadNpmTasks);

};
