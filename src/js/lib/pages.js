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
      return $('[data-page-name="' + name + '"]');
    },

    hideCurrentPage: function (name) {
      this.$currentPage.addClass(this.config.previousClass);
    },

    showNextPage: function (callback) {
      this.$nextPage
        .addClass(this.config.nextClass)
        .addClass(this.config.visibleClass)
        .one(this.config.animationEnd, $.proxy(callback, this));
    },

    changePage: function(name) {
      this.deferred = $.Deferred();
      this.$nextPage = this.getPage(name);
      this.$currentPage = this.getCurrentPage();

      this.hideCurrentPage();

      this.showNextPage(function () {
        this.$nextPage.removeClass(this.config.previousClass);
        this.$currentPage.removeClass(this.config.visibleClass);
        this.deferred.resolve();
      });

      return this.deferred.promise();
    }
  };

});
