define([
  'shared/create-element',
  'shared/get-random-char',
  'shared/mediator',

], function(createElement, getRandomChar, mediator) {

  function Card(options) {
    this.options = options;
    this.prepare();
    this.bind();
  }

  Card.prototype.prepare = function () {
    this.name = this.options.name;
    this.id = getRandomChar(10) + this.name;

    this.elementsHandler();
  };

  Card.prototype.bind = function () {
    this.elements.$el.on('click', $.proxy(this.onClick, this));
  };

  Card.prototype.onClick = function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);

    if($target.hasClass('is-matched')){
      return;
    }

    $target.addClass('is-active');
    this.afterClick();
  };

  Card.prototype.afterClick = function () {
    mediator.publish('card:click', {
      id: this.id,
      name: this.name
    });
  };

  Card.prototype.elementsHandler = function () {
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

  return Card;

});
