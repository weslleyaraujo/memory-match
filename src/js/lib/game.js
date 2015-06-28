define(['lib/page'], function(Pages) {

  function Game () {
    return this;
  }

  Game.prototype.init = function () {
    this.pages = new Pages();
    this.pages.init();
  };

  return Game;

});
