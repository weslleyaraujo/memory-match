define([
    'lib/opening',
    'lib/game',
    'lib/locker',
    'lib/easter-egg',
], function (opening, game, locker, easterEgg) {
  locker.init();
  opening.init();
  game.init();
  easterEgg.init();
});
