;(function (root) {

  root.hasClass = function(el, className) {
    return !!el.className.match(new RegExp(className, 'g'));
  };

} (MemoryMatch.helpers));
