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

  Pages.prototype.init = function () {
    this.bind();
  };

  Pages.prototype.bind = function () {
    mediator.subscribe('pages:change', $.proxy(this.onPageChange, this));
  };

  Pages.prototype.onPageChange = function (data) {
    this.change(this.getCurrent(), this.getPage(data.name), data.callback);
  };

  Pages.prototype.getCurrent = function (data, filter) {
    return $('[data-page-name].is-visible');
  };

  Pages.prototype.getPage = function (name) {
    return $('[data-page-name="' + name + '"');
  };

  Pages.prototype.change = function ($current, $next, callback) {
    $current.addClass('ui-page--move-to-left').removeClass('is-visibile');
    $next
      .addClass('ui-page--move-from-right')
      .addClass('is-visible')
      .one(this.config.animationEnd, function () {
        $next.removeClass('ui-page--move-from-right');
        $next.removeClass('ui-page--move-to-left');
        callback();
      });
  };

  return Pages;

});
