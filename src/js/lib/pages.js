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
          $next = this.getPage(name),
          $current = this.getCurrentPage();

      $current.addClass(this.config.previousClass);

      // TODO: refactor into single methods
      $next
        .addClass(this.config.nextClass)
        .addClass(this.config.visibleClass)
        .one(this.config.animationEnd, $.proxy(function () {

          $next
            .removeClass(this.config.nextClass)
            .removeClass(this.config.previousClass);

          $current.removeClass(this.config.visibleClass);

          deferred.resolve();

        }, this));

      return deferred.promise();
    }
  };

});
