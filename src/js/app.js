define([
    'fastclick',
    'lib/opening',
    'lib/game',
    'lib/locker',
    'lib/easter-egg',
    'lib/back-button',
    'lib/next-level',
], function (fastclick, opening, game, locker, easterEgg, backButton, nextLevel) {
  fastclick.attach(document.body);
  locker.init();
  opening.init();
  game.init();
  easterEgg.init();
  backButton.init();
  nextLevel.init();
});
