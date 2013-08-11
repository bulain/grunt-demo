module.exports = function(grunt) {

  grunt
      .initConfig({
        env : {
          jscover : "java -cp target/dependency/js-1.7R5pre.jar:target/dependency/JSCover-0.3.0.jar jscover.Main"
        },
        shell : {
          jscover : {
            command : [
                'mvn dependency:copy-dependencies',
                '<%=env.jscover%> -ws --document-root=src --report-dir=target --no-instrument=test --port=8001 & > /dev/null',
                'phantomjs src/test/script/run-jscover-qunit.js http://localhost:8001/test/qunit/index.html',
                'wget -O stop http://localhost:8001/stop'].join('&&')
          }
        },
        connect : {
          server : {
            options : {
              port : 8000,
              base : 'src'
            }
          }
        },
        qunit : {
          all : {
            options : {
              urls : ['http://localhost:8000/test/qunit/index.html']
            }
          }
        },
        yuidoc : {
          compile : {
            name : 'grunt-demo',
            options : {
              paths : 'src/main/qunit/',
              outdir : 'target/docs/'
            }
          }
        },
        requirejs : {
          compile : {
            options : {
              baseUrl : "src/main/",
              include: ["util/util1", 'util/util2'],
              out : "target/dist/util.min.js",
              optimize : "none",
              wrap : {
                startFile : ['src/main/frag/startFile.js'],
                endFile : ["src/main/frag/global.js", 'src/main/frag/endFile.js'],
              },
            }
          }
        },
        jshint : {
          all : ['src/main/**/*.js']
        },
        clean : {
          build : ["target"]
        },
        uglify : {
          compile : {
            files : {
              'target/dist/qunit.uglify.js' : ['src/main/qunit/qunit.js']
            }
          }
        }
      });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['connect', 'qunit', 'shell']);

};