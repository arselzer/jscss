var chalk = require("chalk");

module.exports = function(file) {

  if (!process.argv[2]) {
    console.log("Usage: index.js [file]");
    process.exit();
  }

  var selectorMatch = /(([\-:]*[\.>\*\w\[\]"=\-:\|]+(?:\([\d\w\|>]+\))*\s*)+\s*{[\S\s]*?})/g; // Horrible, yes
  var cssSelectors = [];

  var hits;
  while ((hits = selectorMatch.exec(file)) !== null) {
    var selector = {
      str: hits[0],
      start: hits.index,
      end: hits.index + hits[0].length
    };
    cssSelectors.push(selector);
  }

  var output = "";

  var index = 0;
  cssSelectors.forEach(function(selector) {
    output += file.slice(index, selector.start);
    index = selector.end;

    var css = selector.str.replace(/\n/g, " ").replace(/\"/g, "'");

    var embeddedJs = /(\|.*?\|)/g;
    var embeddedExpressions = [];

    var hits;
    while ((hits = embeddedJs.exec(css)) !== null) {
      embeddedExpressions.push({
        str: hits[0],
        start: hits.index,
        end: hits.index - hits[0].length
      });
    }

    output += "css(";

    var i = 0;
    embeddedExpressions.forEach(function(expression) {
      // Plain CSS String
      output += '"' + css.slice(i, expression.start) + '",';

      // JS to be called
      var js = expression.str.replace(/\|/g, "");
      output += js + ",";

      i = expression.end + expression.str.length * 2;
    });

    output += '"' + css.slice(i, css.length).replace(/\n/, " ") + '");';
  });
  output += file.slice(index, file.length).replace(/\n/, " ");

  return output.replace(/\s+/g, " ");
};
