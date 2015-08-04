var jscss = require("../index")
var fs = require('fs')
var input = fs.readFileSync('./source.jscss', 'utf8')

var results = []

function time() {
  var time = process.hrtime()
  for (var j = 0; j < 12; j++) {
    jscss(input)
  }
  var diff = process.hrtime(time)
  var us = (diff[0] * 10e9 + diff[1])
  var ms = us / 1e6
  console.log(ms / 10)
  results.push(ms / 10)
}

for (var i = 0; i < 10; i++) {
  time()
}

var sum = results.reduce(function(a, b) { return a + b })

var mean = sum / results.length

console.log("mean running time: " + mean)
