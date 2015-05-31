;(function (root, helpers) {

  var helpers = {};

  helpers.getName = function (charSize) {
    return Math.random()
      .toString(36)
      .replace(/[0-9]/g, '')
      .replace(/\./g, '')
      .slice(0, charSize);
  };

  helpers.removeClass = function (el, className) {
    var regex = new RegExp(className, 'g');
    el.className = el.className.replace(regex, '');
  };
  
  helpers.hasClass = function(el, className) {
    var regex = new RegExp(className, 'g');
    return !!el.className.match(regex);
  };

  helpers.addClass = function (el, className) {
    var regex = new RegExp(className, 'g');
    if (el.className.match(regex)) {
      return;
    }

    el.className += (' ' + className);
  };

  helpers.getRange = function (initial, to) {
    return Math.floor(Math.random() * to) + initial;
  };

  root.helpers = helpers;

} (window));
