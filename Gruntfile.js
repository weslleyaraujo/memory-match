module.exports = function (grunt) {
  'use strict';

  var tasks = [
    'grunt-contrib-compass',
    'grunt-contrib-watch',
    'grunt-contrib-jshint'
  ],

  config = {};

  // # jshint
  config.jshint = {
    all: {
      src: [
        'Gruntfile.js',
        'src/*.js'
      ]
    }
  };

  // config
  grunt.initConfig(config);

  // load tasks
  tasks.forEach(grunt.loadNpmTasks);

};
