var convert = require("./lib/convert");
var compile = require("./lib/compile");

exports = function(jscss, options) {
  var converted = convert(jscss);

  if (options.pretty) {
    return compile.pretty(converted);
  }
  else if (options.intermediate) {
    return converted;
  }
  else {
    return compile.compact(converted);
  }
};
