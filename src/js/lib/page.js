define(['shared/mediator', 'jquery'], function (mediator, $) {

  function Pages () {
    this.config = {};
    this.config.animationEnd = [
      'webkitAnimationEnd',
      'oanimationend',
      'msAnimationEnd',
      'animationend',
    ].join(' ');

    return this;
  };

  window.mediator = mediator;

  Pages.prototype.init = function () {
    this.prepare();
    this.bind();
  };

  Pages.prototype.prepare = function () {
    this.$el = $('[data-page-name]');
  };

  Pages.prototype.bind = function () {
    mediator.subscribe('pages:change', $.proxy(this.onPageChange, this));
  };

  Pages.prototype.onPageChange = function (data) {
    this.change(this.getCurrent(), this.getPage(data.name), data.callback);
  };

  Pages.prototype.getCurrent = function (data, filter) {
    return this.$el.filter(function (index, item) {
      return $(item).hasClass('is-visible');
    });
  };

  Pages.prototype.getPage = function (name) {
    return this.$el.filter(function (index, item) {
      return $(item).attr('data-page-name') == name;
    });
  };

  Pages.prototype.change = function ($current, $next, callback) {
    $current.addClass('ui-page--move-to-left').removeClass('is-visibile');
    $next
      .addClass('ui-page--move-from-right')
      .addClass('is-visible')
      .one(this.config.animationEnd, callback || $.noop);
  };

  return Pages;

});
