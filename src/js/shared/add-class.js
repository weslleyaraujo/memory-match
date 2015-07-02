;(function (root) {

  root.addClass = function (el, className) {
    if (el.className.match(new RegExp(className, 'g'))) {
      return;
    }

    el.className += (' ' + className);
  };

} (MemoryMatch.helpers));
