'use strict'

var fs = require('fs')
var jscss = require('./index')
var input = fs.readFileSync('./fixture.css', 'utf8')

console.log(jscss(input))
