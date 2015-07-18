define([
  'jquery',
  'shared/mediator',
], function (jquery, mediator) {

  return {
    config: {
      el: '[data-component="back-button"]'
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
    },

    onClick: function (event) {
      mediator.publish('game:abort');
      mediator.publish('multicontent:show', {
        name: 'title'
      });

      event.preventDefault();
    },
  };

});
