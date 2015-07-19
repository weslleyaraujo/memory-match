define([
    'lib/opening',
    'lib/game',
    'lib/locker',
    'lib/easter-egg',
    'lib/back-button',
], function (opening, game, locker, easterEgg, backButton) {
  locker.init();
  opening.init();
  game.init();
  easterEgg.init();
  backButton.init();
});
