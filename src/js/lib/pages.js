define([
  'jquery',
  'config/animation-end',
], function ($, animationEnd) {

  return $.extend({}, {

    config: {
      visibleClass: 'is-visible',
      previousClass: 'ui-page--move-to-left',
      nextClass: 'ui-page--move-from-right'
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
        .one(animationEnd, $.proxy(callback, this));
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
  });

});
