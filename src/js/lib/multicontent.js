define([
  'jquery',
  'shared/mediator',
], function (jquery, mediator) {

  return {
    config: {
      el: '[data-component="multicontent"]'
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
      mediator.subscribe('multicontent:show', this.onShow, this);
    },

    onShow: function (data) {
      this.hideAll();
      this.show(data.name);
    },

    hideAll: function () {
      this.elements.$el.find('[data-multicontent-name]').addClass('is-hidden');
    },

    show: function (name) {
      this.elements.$el.find('[data-multicontent-name="'+ name +'"]').removeClass('is-hidden');
    },
  };

});
