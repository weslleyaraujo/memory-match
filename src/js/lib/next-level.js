define([
    'lib/pages',

    'config/levels',
    'shared/mediator'

], function(pages, levels, mediator) {

  return $.extend(true, {}, pages, {
    config: {
      el: '[data-component="next-level"]',
      labels: {
        next: 'Play next level!',
        maximum: 'Play again!'
      }
    },

    init: function () {
      this.prepare();
      this.bind();
    },

    prepare: function () {
      this.elements = {};
      this.elements.$el = $(this.config.el);
    },

    bind: function () {
      this.elements.$el.on('click', $.proxy(this.onClick, this));
      mediator.subscribe('game:win', $.proxy(this.onGameWin, this));
      mediator.subscribe('game:start', $.proxy(this.onGameStart, this));
    },

    setLabel: function (name) {
      this.elements.$el.text(name).addClass('is-active');
    },

    getLastLevel: function () {
      var size = levels.length;
      return levels[size - 1];
    },

    onClick: function(event) {
      mediator.publish('game:abort');

      this.changePage('game').done($.proxy(function() {
        mediator.publish('game:start', this.next ? this.next : this.getNextLevel());
      }, this));

      event.preventDefault();
    },

    getNextLevel: function() {
      return levels.reduce($.proxy(function (actual, next) {
        return ((this.options.index + 1)  === next.index) ? next : actual;
      }, this), false);
    },

    onGameStart: function () {
      this.hideText();
    },

    hideText: function () {
      this.elements.$el.removeClass('is-active');
    },

    onGameWin: function (data) {
      this.options = data;
      this.next = this.getNextLevel();

      if (this.next) {
        this.setLabel(this.config.labels.next);
        return;
      }

      this.setLabel(this.config.labels.maximum);
    },

  });

});
