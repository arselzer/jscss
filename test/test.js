'use strict'

var fs = require('fs')
var jscss = require('../index')
var test = require('assertit')

var input = fs.readFileSync('./source.jscss', 'utf8')
var expected =  fs.readFileSync('./expected.css', 'utf8')

test('jscss', function () {
  test('should compile given string to CSS (sync api)', function (done) {
    var actual = jscss(input)
    test.equal(actual, expected, 'should be equal')
    done()

  })
  test('should compile string to CSS (callback api)', function (done) {
    jscss(input, function (err, actual) {
      test.ifError(err)
      test.equal(actual, expected, 'should be equal')
      done()
    })
  })
})

var results = []

function time() {
  var hrtime = process.hrtime()
  for (var j = 0; j < 10; j++) {
    jscss(input)
  }
  var diff = process.hrtime()
  var milliseconds = (diff[0] * 10e9 + diff[1]) / 10e9
  results.push(milliseconds) // avg
}

for (var i = 0; i < 6; i++) {
  time()
}

var sum = results.reduce(function(a, b) { return a + b })

var mean = sum / results.length

console.log("mean running time: " + mean)
