define(['jquery'], function ($) {

  return {

    config: {
      visibleClass: 'is-visible',
      previousClass: 'ui-page--move-to-left',
      nextClass: 'ui-page--move-from-right',

      animationEnd: [
        'webkitAnimationEnd',
        'oanimationend',
        'msAnimationEnd',
        'animationend',
      ].join(' ')
    },

    getCurrentPage: function (data, filter) {
      return $('[data-page-name].is-visible');
    },

    getPage: function (name) {
      return $('[data-page-name="' + name + '"');
    },

    changePage: function(name) {
      var deferred = $.Deferred(),
          $next = this.getPage(name);

      this.hideCurrentPage();

      $next
        .addClass(this.config.nextClass)
        .addClass(this.config.visibleClass)
        .one(this.config.animationEnd, $.proxy(function () {
          $next
            .removeClass(this.config.nextClass)
            .removeClass(this.config.previousClass);
          deferred.resolve();
        }, this));

      return deferred.promise();
    },

    hideCurrentPage: function () {
      var $current = this.getCurrentPage();

      $current
        .addClass(this.config.previousClass)
        .removeClass(this.config.visibleClass);
    }
  };

});
