define([
  'shared/mediator',
], function(mediator) {
  return {
    config: {
      el: '[data-component="locker"]'
    },

    init: function() {
      this.prepare();
      this.bind();
    },

    prepare: function() {
      this.elements = {};
      this.elements.$el = $(this.config.el);
    },

    bind: function() {
      mediator.subscribe('locker:active', $.proxy(this.onLockerActive, this));
      mediator.subscribe('locker:remove', $.proxy(this.onLockerRemove, this));
    },

    onLockerActive: function () {
      this.active();
    },

    onLockerRemove: function () {
      this.remove();
    },

    active: function () {
      this.elements.$el.addClass('is-active');
    },

    remove: function () {
      this.elements.$el.removeClass('is-active');
    },
  };
});
