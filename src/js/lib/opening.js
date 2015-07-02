define([
    'lib/pages',

    'shared/config.levels',
    'shared/mediator'

], function(pages, levels, mediator) {

  return $.extend({}, pages, {
    config: {
      el: '[data-component="initial-form"]'
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
      this.elements.$el.on('submit', $.proxy(this.onSubmit, this));
    },

    getLevel: function () {
      return this.elements.$el.find('[name="level"]').val();
    },

    onSubmit: function (event) {
      this.changePage('game').done($.proxy(this.onPageChange, this));
      event.preventDefault();
    },

    getData: function () {
      var value = this.getLevel();

      return {
        x: levels[value].size,
        y: levels[value].size,
      };
    },

    onPageChange: function () {
      var data = this.getData();

      mediator.publish('game:start', {
        x: data.x,
        y: data.y
      });
    },
  });

});
