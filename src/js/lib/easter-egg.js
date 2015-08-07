define([
  'jquery',
  'shared/mediator',
  'config/animation-end',
], function (jquery, mediator, animationEnd) {

  return {
    config: {
      el: '[data-component="easter-egg"]',
      favicon: {
        el: 'link[rel="icon"]',
        data: 'favicon-easter-egg.png'
      },
      bodyActiveClass: 'penis-mode'
    },

    init: function () {
      this.prepare();
      this.bind();
    },

    prepare: function () {
      this.elements = {};
      this.elements.$el = $(this.config.el);
      this.elements.$favicon = $(this.config.favicon.el);
      this.elements.$body = $('body');
    },

    bind: function () {
      this.elements.$el.find('.ui-easter-egg-image').one(animationEnd, $.proxy(this.onAnimationEnd, this));
      mediator.subscribe('easteregg:show', this.onShow, this);
    },

    onShow: function () {
      this.setFavicon();
      this.elements.$el.addClass('is-visible');
      this.elements.$body.addClass(this.config.bodyActiveClass);
    },

    onAnimationEnd: function () {
      this.elements.$el.addClass('is-done');
    },

    setFavicon: function () {
      var icon = this.elements.$favicon.data('hostname') + this.config.favicon.data;
      this.elements.$favicon.attr('href', icon);
    },
  };

});
