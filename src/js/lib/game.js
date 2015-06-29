define([
    'lib/page',
    'lib/memory-match',

    'shared/levels',
    'shared/mediator'

], function(Pages, MemoryMatch, levels, mediator) {

  var game = {};

  game.init = function () {
    this.prepare();
    this.bind();
    this.pages.init();
  };

  game.prepare = function () {
    // start deps
    this.pages = new Pages();
    this.memory = new MemoryMatch();

    // dom elements
    this.elements = {};
    this.elements.$form = $('[data-component="initial-form"]');
  };

  game.bind = function () {
    this.elements.$form.on('submit', $.proxy(this.onSubmit, this));
  };

  game.getLevel = function () {
    return this.elements.$form.find('[name="level"]').val();
  };

  game.onSubmit = function (event) {
    this.send();
    event.preventDefault();
  };

  game.getData = function (value) {
    var value = this.getLevel();

    return {
      x: levels[value].size,
      y: levels[value].size,
    }
  };

  game.send = function () {
    mediator.publish('pages:change', {
      name: 'game',
      callback: $.proxy(this.onPageChange, this)
    });
  };

  game.onPageChange = function () {
    mediator.publish('memory-match:create', {
      level: this.getData()
    });
  };

  // return $.extend(pages, {

  //   config: {
  //           
  //   },
  // 
  //   init: function () {
  //     this.prepare();
  //     this.bind();
  //   }
  // });

});
