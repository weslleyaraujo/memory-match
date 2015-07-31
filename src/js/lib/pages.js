define([
  'jquery',
  'config/animation-end',
  'shared/once',
], function ($, animationEnd, once) {

  return $.extend({}, {

    config: {
      visibleClass: 'is-visible',
      toLeftClass: 'ui-page--move-to-left',
      toRightClass: 'ui-page--move-to-right',

      fromLeftClass: 'ui-page--move-from-left',
      fromRightClass: 'ui-page--move-from-right'
    },

    getCurrentPage: function (data, filter) {
      return $('[data-page-name].is-visible');
    },

    getPage: function (name) {
      return $('[data-page-name="' + name + '"]');
    },

    hideCurrentPage: function (name) {
      var animation = this.isPrevious() ? this.config.toLeftClass : this.config.toRightClass;
      this.$currentPage.addClass(animation);
    },

    showNextPage: function (callback) {
      var animation = this.isPrevious() ? this.config.fromRightClass : this.config.fromLeftClass;
      callback = once(callback, this);

      this.$nextPage
        .addClass(animation)
        .addClass(this.config.visibleClass)
        .one(animationEnd, callback);
    },

    isPrevious: function() {
      return this.$currentPage.data('page-index') < this.$nextPage.data('page-index');
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
          .removeClass(this.config.toLeftClass)
          .removeClass(this.config.toRightClass)
          .removeClass(this.config.fromLeftClass)
          .removeClass(this.config.fromRightClass);
    }
  });

});
