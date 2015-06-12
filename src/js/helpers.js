;(function (root, helpers) {

  var helpers = {};

  helpers.getName = function (charSize) {
    charSize = charSize || 1;
    return Math.random()
      .toString(36)
      .replace(/[0-9]/g, '')
      .replace(/\./g, '')
      .slice(0, charSize)
      [(Math.random()<.5) ? 'toUpperCase' : 'toString']();
  };

  helpers.removeClass = function (el, className) {
    el.className = el.className.replace(new RegExp(className, 'g'), '');
  };
  
  helpers.hasClass = function(el, className) {
    return !!el.className.match(new RegExp(className, 'g'));
  };

  helpers.addClass = function (el, className) {
    if (el.className.match(new RegExp(className, 'g'))) {
      return;
    }

    el.className += (' ' + className);
  };

  helpers.getRange = function (initial, to) {
    return Math.floor(Math.random() * to) + initial;
  };

  root.helpers = helpers;

} (window));
