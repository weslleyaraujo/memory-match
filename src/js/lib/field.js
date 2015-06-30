define([
  'shared/create-element',
  'shared/get-random-char',

], function(createElement, getRandomChar) {

  function Field(options) {
    this.options = options;
    this.prepare();
  }

  Field.prototype.prepare = function () {
    this.name = this.options.name;
    this.id = this.options.name + '-' + getRandomChar();
    this.elementsHandler();
  };

  Field.prototype.bind = function () {
    this.$el.on('click', $.proxy(this.onClick, this));
  };

  Field.prototype.onClick = function (event) {
    event.preventDefault();
  };

  Field.prototype.elementsHandler = function () {
    this.elements = {};
    this.elements.$el = createElement('td', {
      id: this.options.id
    });

    this.elements.$back = createElement('figure', {
      class: 'is-back ui-inputs',
      text: this.name
    });
    this.elements.$front = createElement('figure', {
      class: 'is-front ui-inputs'
    });

    // append into main element
    this.elements.$el.append(this.elements.$back, this.elements.$front);

  };


  return Field;

});
