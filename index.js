'use strict'

var vm = require('vm')

module.exports = jscss

function jscss (input, callback) {
  if (typeof input !== 'string') {
    throw new TypeError('jscss expect `input` string')
  }
  input = compile(convert(input))

  return typeof callback === 'function'
    ? callback(null, input)
    : input
}

function compile (input) {
  var output = ''
  var sandbox = {
    css: function () {
      var args = Array.prototype.slice.call(arguments)
      output += args.join('')
    }
  }

  vm.runInNewContext(input, sandbox)
  return output
}

function convert (input) {
  var selectorRe = /(([\-:]*[\.>\*\w\[\]"=\-:\|]+(?:\([\d\w\|>]+\))*\s*)+\s*{[\S\s]*?})/gi
  var selectors = []
  var output = ''
  var index = 0
  var hits = null

  while ((hits = selectorRe.exec(input)) !== null) {
    var selector = {
      input: hits[0],
      start: hits.index,
      end: hits.index + hits[0].length
    }
    selectors.push(selector)
  }

  var lenSelectors = selectors.length
  var j = 0

  while (j < lenSelectors) {
    var selector = selectors[j++]
    output += input.slice(index, selector.start)
    index = selector.end

    var css = selector.input.replace(/\n/g, ' ').replace(/\"/g, "'")
    var jsRe = /(\|.*?\|)/gi
    var jsMatches = []
    var m = null
    var i = 0

    while ((m = jsRe.exec(css)) !== null) {
      jsMatches.push({
        input: m[0],
        start: m.index,
        end: m.index - m[0].length
      })
    }

    output += 'css('

    var jsLength = jsMatches.length
    var z = 0

    while (z < jsLength) {
      var js = jsMatches[z++]
      output += '"' + css.slice(i, js.start) + '",'
      output += (js.input.replace(/\|/g, '')) + ','
      i = js.end + js.input.length * 2
    }
    output += '"' + css.slice(i, css.length).replace(/\n/, ' ') + '");'
  }
  output += input.slice(index, input.length).replace(/\n/, ' ')

  return output.replace(/\s+/g, ' ')
}
