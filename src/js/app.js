define([
    'fastclick',
    'lib/opening',
    'lib/game',
    'lib/locker',
    'lib/easter-egg',
    'lib/back-button',
    'lib/next-level',
    'lib/tracking',
], function (fastclick, opening, game, locker, easterEgg, backButton, nextLevel, tracking) {
  fastclick.attach(document.body);

  Array.prototype.slice.call(arguments).forEach(function (component) {
    if (component.init) {
      component.init();
    }
  });

});
