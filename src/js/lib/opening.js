define([
    'lib/pages',

    'shared/levels',
    'shared/mediator'

], function(pages, levels, mediator) {

  return $.extend({}, pages, {
  
    init: function () {
      this.prepare();
      this.bind();
    },

    prepare: function () {
      this.elements = {};
      this.elements.$form = $('[data-component="initial-form"]');
    },

    bind: function () {
      this.elements.$form.on('submit', $.proxy(this.onSubmit, this));
    },

    getLevel: function () {
      return this.elements.$form.find('[name="level"]').val();
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
