'use strict'

var fs = require('fs')
var jscss = require('./index')
var test = require('assertit')

var input = fs.readFileSync('./fixture.css', 'utf8')
var expected =  fs.readFileSync('./expected.css', 'utf8')

test('jscss', function () {
  test('should compile given string to CSS (sync api)', function (done) {
    var actual = jscss(input)
    test.equal(actual, expected, 'should be equal')
    done()

  })
  test('should compile string to CSS (callback api)', function (done) {
    var input = fs.readFileSync('./fixture.css', 'utf8')
    jscss(input, function (err, actual) {
      test.ifError(err)
      test.equal(actual, expected, 'should be equal')
      done()
    })
  })
})
