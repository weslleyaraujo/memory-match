define([
  'jquery',
  'lib/pages'

], function(jquery, pages) {

  return $.extend(true, {}, pages, {
    config: {
      el: '[data-component="board"]',
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
      mediator.subscribe('game:win', this.onWin, this);
    },

  });

});
