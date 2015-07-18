define([
    'lib/opening',
    'lib/game',
    'lib/locker',
    'lib/easter-egg',
    'lib/multicontent',
    'lib/back-button',
], function (opening, game, locker, easterEgg, multicontent, backButton) {
  locker.init();
  opening.init();
  game.init();
  easterEgg.init();
  multicontent.init();
  backButton.init();
});
