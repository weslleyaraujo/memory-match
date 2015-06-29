define([
    'lib/page',
    'lib/memory-match',

    'shared/levels',
    'shared/mediator'

], function(Pages, MemoryMatch, levels, mediator) {

  function Game () {
    return this;
  }

  Game.prototype.init = function () {
    this.prepare();
    this.bind();
    this.pages.init();
  };

  Game.prototype.prepare = function () {
    // start deps
    this.pages = new Pages();
    this.memory = new MemoryMatch();

    // dom elements
    this.elements = {};
    this.elements.$form = $('[data-component="initial-form"]');
  };

  Game.prototype.bind = function () {
    this.elements.$form.on('submit', $.proxy(this.onSubmit, this));
  };

  Game.prototype.getLevel = function () {
    return this.elements.$form.find('[name="level"]').val();
  };

  Game.prototype.onSubmit = function (event) {
    this.send();
    event.preventDefault();
  };

  Game.prototype.getData = function (value) {
    var value = this.getLevel();

    return {
      x: levels[value].size,
      y: levels[value].size,
    }
  };

  Game.prototype.send = function () {
    mediator.publish('pages:change', {
      name: 'game',
      callback: $.proxy(this.onPageChange, this)
    });
  };

  Game.prototype.onPageChange = function () {
    mediator.publish('memory-match:create', {
      level: this.getData()
    });
  };

  return Game;

});
