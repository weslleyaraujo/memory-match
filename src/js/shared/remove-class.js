;(function (root) {

  root.removeClass = function (el, className) {
    el.className = el.className.replace(new RegExp(className, 'g'), '');
  };

} (MemoryMatch.helpers));
