var vm = require("vm");
var cssbeautify = require("cssbeautify");

function compile(input) {
  var output = "";
  var sandbox = {
    css: function() {
      var args = Array.prototype.slice.call(arguments);
      output += args.join("");
    }
  };

  vm.runInNewContext(input, sandbox);
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
