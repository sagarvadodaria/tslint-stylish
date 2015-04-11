(function () {
  'use strict';

  var stylish = require('../');
  var assert = require('assert');
  var gulp = require('gulp');
  var tslint = require('gulp-tslint');
  var util = require('util');

  var _stdout = process.stdout.write.bind(process.stdout);
  process.stdout.write = function (str) {
    log.push(str);
  };
  console.log = function () {
    _stdout(util.format.apply(this, arguments) + '\n');
  };
  var log = [];
  
  var lintOutput = [
      {
        "name":"TestSrc.ts",
        "failure":"file should end with a newline",
        "startPosition": {
          "position":440,
          "line":19,
          "character":28
        },
        "endPosition": {
          "position":440,
          "line":19,
          "character":28
        },
        "ruleName":"eofline"
      },{
        "name":"TestSrc.ts",
        "failure":"' should be \"",
        "startPosition": {
          "position":391,
          "line":17,
          "character":24
        },
        "endPosition": {
          "position":397,
          "line":17,
          "character":30
        },
        "ruleName":"quotemark"
      }
    ];

  var errors = {};
  errors.title = '\n  \u001b[4mTestSrc.ts\u001b[24m\n';
  errors.content = '      \u001b[90mline 17\u001b[39m  \u001b[90mcol 24\u001b[39m' +
      '  \u001b[31m\' should be "\u001b[39m\n      \u001b[90mline 19\u001b[39m  ' +
      '\u001b[90mcol 28\u001b[39m  \u001b[31mfile should end with a ' +
      'newline\u001b[39m';
  errors.count = '\n\n    \u001b[31m\u001b[31m✖\u001b[31m\u001b[39m 2 errors\n\n';


  describe('index.js', function () {

    it('provides output as expected', function () {
      log = [];
      stylish(lintOutput);
      assert.equal(log[0], errors.title);
      assert.equal(log[1], errors.content);
      assert.equal(log[2], errors.count);
    });

  });

  describe('Gulp linter', function () {

    function linter(cb) {
      gulp.src('test/fixtures/TestSrc.ts')
        .pipe(tslint())
        .pipe(tslint.report(stylish, {
          emitError: false
        }))
        .on('end', cb);
    }

    it('should be used by gulp-tslint', function (done) {
      log = [];
      linter(function () {
        assert.equal(log[0], errors.title);
        assert.equal(log[1], errors.content);
        assert.equal(log[2], errors.count);
        done();
      });
    });
  });

}());