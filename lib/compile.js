var fs = require("fs");
var cssbeautify = require("cssbeautify");

function compile(input) {
  var output = "";

  function css() {
    var args = Array.prototype.slice.call(arguments);
    output += args.join("");
  }

  eval(input);
  return output;
}

module.exports.pretty = function(input) {
  return cssbeautify(compile(input), {
    indent: "  "
  });
};

module.exports.compact = function(input) {
  return compile(input);
};
