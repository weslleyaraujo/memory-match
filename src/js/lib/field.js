define([
  'shared/create-element',
  'shared/get-random-char',
  'shared/mediator',

], function(createElement, getRandomChar, mediator) {

  function Field(options) {
    this.options = options;
    this.prepare();
    this.bind();
  }

  Field.prototype.prepare = function () {
    this.name = this.options.name;
    this.id = this.options.name + '-' + getRandomChar(10);

    this.elementsHandler();
  };

  Field.prototype.bind = function () {
    this.elements.$el.on('click', $.proxy(this.onClick, this));
  };

  Field.prototype.onClick = function (event) {
    var $target = $(event.currentTarget);

    if ($target.hasClass('is-active')) {
      $target.removeClass('is-active');
      return;
    }

    $target.addClass('is-active');

    this.afterClick();

    event.preventDefault();
  };

  Field.prototype.afterClick = function () {
    mediator.publish('field:click', {
      id: this.id,
      name: this.name
    });
  };

  Field.prototype.elementsHandler = function () {
    this.elements = {};
    this.elements.$el = createElement('td', {
      id: this.id
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
