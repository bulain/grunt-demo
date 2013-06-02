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
                'wget http://localhost:8001/stop'].join('&&')
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
        }
      });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.registerTask('default', ['connect', 'qunit', 'shell']);

};