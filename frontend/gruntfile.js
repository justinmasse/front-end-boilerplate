module.exports = function(grunt) {
  var p = grunt.file.readJSON('package.json');

  grunt.loadNpmTasks('grunt-contrib-compass');  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: '../public/css',
          outputStyle: 'compressed'
        }
      },
      dev: {
        options: {
          sassDir: 'sass',
          cssDir: '../public/css',
          outputStyle: 'expanded'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        compress: true,
        mangle: true
      },
      build: {
        src: 'js/main-combined.js',
        dest: '../public/js/main-combined.min.js'
      }
    },  
    copy: {
        images: {
          expand: true,
          filter: 'isFile',
          flatten: true,
          cwd: 'imgs/',
          src: ['**'],
          dest: '../public/imgs/'
        },
        fonts: {
          expand: true,
          src: ["fonts/*"],
          dest: '../public/fonts/'
        },
        scripts: {
          expand: true,
          src: ["js/main-combined.js"],
          dest: '../public/'
        },
        client: {
          expand: true,
          src: ["templates/<%= pkg.client %>/css/**/*","templates/<%= pkg.client %>/imgs/**/*","templates/<%= pkg.client %>/js/**/*" ],
          dest: '../public/'
        },
        libFoundation:{
          expand: true,
          cwd: 'js/libs/foundation/',
          src: ["foundation.css"],
          dest: 'sass/libs',
          rename: function(dest, src) {
            // use the source directory to create the file
            // example with your directory structure
            //   dest = 'dev/js/'
            //   src = 'module1/js/main.js'
            return 'sass/libs/' + src.substring(0, src.indexOf('.')) + '.scss';
          }
        },
        clientCustomCSS:{
          expand: true,
          cwd: 'templates/<%= pkg.client %>/css/custom/',
          src: ["*.scss"],
          dest: 'sass/framework-custom'
        }
    },
    bower: {
      install: {},
      options: {
         install: true,
         targetDir: "js/libs/bower",
         cleanBowerDir: true,
         layout: 'byType',
         verbose : true,
         layout: 'byComponent'
      }
    },
    concat: {
      options: {},
      scripts: {
        src: ['js/libs/*/*/*.js', 'js/custom/**/*.js','js/libs/*.js', 'js/main.js'],
        dest: 'js/main-combined.js',
      },
      client: {
        src: ['templates/<%= pkg.client %>/header.html','views/**/*.html','templates/<%= pkg.client %>/scripts.html',  'templates/<%= pkg.client %>/footer.html'],
        dest: '../public/index.html',
      },
    },
    watch: {
      scripts: {
        files: ['js/**/*.js', 'js/*.js'],
        tasks: ['concat:scripts', 'copy:scripts'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['compass:dev'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      html: {
        files: ['**/*.html'],
        tasks: ['htmlbuild'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      images: {
        files: ['imgs/**/*'],
        tasks: ['copy:images'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    htmlbuild: {
        root: {
            src: 'views/*.html',
            dest: '../public/',
            options: {
                beautify: true,
                prefix: '',
                relative: true,
                sections: {
                    views: 'templates/<%= pkg.client %>/**/*.html',
                    layout: {
                        styles: 'templates/<%= pkg.client %>/styles.html',
                        scripts: 'templates/<%= pkg.client %>/scripts.html',
                        header: 'templates/<%= pkg.client %>/header.html',
                        footer: 'templates/<%= pkg.client %>/footer.html'
                    }
                }
            }
        }
    },
    clean: {
      init: ["../public/**/*","sass/libs/foundation.scss"],
      dev: ["../public/**/*.html","sass/libs/foundation.scss"],
      build: ["../public/**/*","sass/libs/foundation.scss"],
      options: {
        force: true
      }
    },

  });

  // Default task(s).
  grunt.registerTask('cleaner', ['clean:init']);
  grunt.registerTask('init', ['clean:init', 'bower']);
  grunt.registerTask('default', ['copy:clientCustomCSS','copy:libFoundation','clean:dev', 'compass:dev','concat:scripts','copy:client', 'copy:images', 'copy:fonts', 'copy:scripts', 'htmlbuild', 'watch']);
  grunt.registerTask('build', ['copy:clientCustomCSS','copy:libFoundation','clean:build', 'compass:dist','concat:scripts','concat:client', 'copy:client','copy:images', 'copy:fonts', 'uglify', 'htmlbuild']);

};