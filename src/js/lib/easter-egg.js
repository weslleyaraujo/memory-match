define([
  'jquery'
], function () {

  return {
    config: {
      el: 'body'
    },

    init: function () {
      this.prepare();
      this.create();
    },

    prepare: function () {
      this.elements = {};
      this.elements.$el = $(this.config.el);
    },

    create: function () {
              debugger;
    },
  };

});
