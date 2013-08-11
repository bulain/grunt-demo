
if (typeof define !== 'undefined' && define.amd) {
  define([], function() {
    return util;
  });
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = util;
} else {
  root.util = util;
}