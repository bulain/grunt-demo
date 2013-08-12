var exports = ['util/util1', 'util/util2', ];

var global = {};
require(exports, function() {
  var modules = arguments;
  exports.forEach(function(ns, index) {
    var splits = ns.split('/');
    splits.reduce(function(prev, curr, i) {
      if (i < splits.length - 1) {
        prev[curr] = prev[curr] || {};
      } else {
        prev[curr] = modules[index];
      }
      return prev[curr];
    }, global);
  });
});

if (typeof define !== 'undefined' && define.amd) {
  define('', [], function() {
    return global;
  });
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = global;
} else {
  root = global;
}