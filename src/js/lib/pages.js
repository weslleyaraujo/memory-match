define([
  'jquery',
  'config/animation-end',
  'shared/once',
], function ($, animationEnd, once) {

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
      callback = once(callback, this);

      this.$nextPage
        .addClass(this.config.nextClass)
        .addClass(this.config.visibleClass)
        .one(animationEnd, callback);
    },

    changePage: function(name) {
      this.deferred = $.Deferred();
      this.$nextPage = this.getPage(name);
      this.$currentPage = this.getCurrentPage();

      this.hideCurrentPage();

      this.showNextPage(function () {
        this.removePageClasses(this.$nextPage);
        this.removePageClasses(this.$currentPage);
        this.$currentPage.removeClass(this.config.visibleClass);
        this.deferred.resolve();
      });

      return this.deferred.promise();
    },

    removePageClasses: function($target) {
        $target
          .removeClass(this.config.previousClass)
          .removeClass(this.config.nextClass);
    }
  });

});
