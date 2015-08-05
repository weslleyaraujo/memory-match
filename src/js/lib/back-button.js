define([
  'jquery',

  'lib/pages',
  'shared/mediator',
], function (jquery, pages, mediator) {

  return $.extend(true, {}, pages, {
    config: {
      el: '[data-component="back-button"]',
      hiddenClass: 'is-hidden'
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
      mediator.subscribe('game:start', $.proxy(this.onGameStart, this));
    },

    onGameStart: function () {
      this.show();
    },

    hide: function () {
      this.elements.$el.addClass(this.config.hiddenClass);
    },

    show: function () {
      this.elements.$el.removeClass(this.config.hiddenClass);
    },

    onClick: function (event) {
      this.changePage('initial').done($.proxy(function () {
        mediator.publish('game:abort');
        this.hide();
      }, this));

      event.preventDefault();
    },
  });

});
