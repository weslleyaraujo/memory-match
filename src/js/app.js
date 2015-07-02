define([
    'lib/opening',
    'lib/game',
    'lib/locker',
], function (opening, game, locker) {
  locker.init();
  opening.init();
  game.init();
});
