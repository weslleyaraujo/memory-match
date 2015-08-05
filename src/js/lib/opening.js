define([
    'lib/pages',

    'config/levels',
    'shared/mediator'

], function(pages, levels, mediator) {

  return $.extend(true, {}, pages, {
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

    getLevelName: function () {
      return this.elements.$el.find('[name="level"]').val();
    },

    getLevel: function (value) {
      return levels.filter(function (item) {
        return item.name === value;
      })[0];
    },

    onSubmit: function (event) {
      this.changePage('game').done($.proxy(this.onPageChange, this));
      event.preventDefault();
    },

    onPageChange: function () {
      var name = this.getLevelName();
      mediator.publish('game:start', this.getLevel(name));
    },
  });

});
