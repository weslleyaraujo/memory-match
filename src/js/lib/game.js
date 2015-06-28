define(['jquery'], function($) {

  function Game () {
    return this;
  }

  Game.prototype.init = function () {
    console.log('yeah');
  };

  return Game;

});
