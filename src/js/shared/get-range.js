;(function (root) {

  root.getRange = function (initial, to) {
    return Math.floor(Math.random() * to) + initial;
  };

} (MemoryMatch.helpers));

