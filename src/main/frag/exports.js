
var exports = ['util/util1', 'util/util2', ];

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
    }, window);
  });
});

