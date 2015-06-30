module.exports = function (grunt) {
  'use strict';

  var tasks = [
    'grunt-sass',
    'grunt-postcss',
    'grunt-contrib-jshint',
    'grunt-contrib-watch',
    'grunt-contrib-connect',
  ],

  config = {};

  // js files
  config.js = {};
  config.js.files = [
    'src/js/main.js',
    'src/js/shared/*.js',

    'src/js/field.js',
    'src/js/memory-match.js',
    'src/js/app.js'
  ];

  // jshint
  config.jshint = {
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

  // config
  grunt.initConfig(config);

  // load tasks
  tasks.forEach(grunt.loadNpmTasks);

  // tasks
  grunt.registerTask('develop', [
    'sass',
    'postcss',
    'jshint:all',
    'connect',
    'watch'
  ]);

  grunt.event.on('watch', function(action, filepath) {
    grunt.config('jshint.specific.src', filepath);
  });

};
