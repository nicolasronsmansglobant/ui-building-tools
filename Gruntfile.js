'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      all: {
        compress: true,
        files: {
          'css/app.css': 'css/src/app.less'
        }
      }
    },

    hogan: {
      all: {
        src: 'js/src/**/*.mustache',
        dest: 'js/src/template.js',
        options: {
          binderName: 'amd'
        }
      }
    },

    requirejs: {
      all: {
        options: {
          baseUrl: 'js/src',
          name: 'main',
          out: 'js/app.min.js',
          optimize: 'uglify2',
          paths: {
            'jquery': 'empty:',
            'hogan': 'empty:'
          },
          cjsTranslate: true
        }
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'js/src/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    csslint: {
      all: {
        src: ['css/**/*.css']
      },
      options: {
        csslintrc: '.csslintrc'
      }
    },

    watch: {
      js: {
        files: ['Gruntfile.js', 'js/src/**/*.{js,mustache}'],
        tasks: ['js'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['css/src/**/*.less'],
        tasks: ['css'],
        options: {
          livereload: true
        }
      },
      general: {
        files: ['index.html', 'tests/**/*.js'],
        options: {
          livereload: true
        }
      }
    },

    connect: {
      all: {
        options: {
          hostname: '*',
          port: process.env.PORT || '6789',
          base: '.',
          livereload: true
        }
      }
    },

    intern: {
      all: {
        options: {
          runType: 'client',
          config: 'tests/intern',
          reporters: ['console'],
          suites: ['tests/app']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-hogan');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('intern');

  grunt.registerTask('js', ['jshint', 'hogan', 'requirejs']);
  grunt.registerTask('css', ['less', 'csslint']);
  grunt.registerTask('build', ['js', 'css']);
  grunt.registerTask('start', ['build', 'test', 'connect', 'watch']);
  grunt.registerTask('test', ['intern']);
  grunt.registerTask('default', ['start']);
};
