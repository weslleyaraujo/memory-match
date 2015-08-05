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
      mediator.subscribe('game:win', $.proxy(this.onGameWin, this));
      mediator.subscribe('game:start', $.proxy(this.onGameStart, this));
    },

    setLabel: function (name) {
      this.elements.$el.text(name).addClass('is-active');
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
