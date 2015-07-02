define([
  'lib/field',
  'lib/pages',
  'shared/mediator',
  'shared/create-array',
  'shared/get-random-char',
  'shared/get-range',
  'shared/create-element',
  'shared/animation-end',

], function(Field, pages, mediator, createArray, getRandomChar, getRange, createElement, animationEnd) {

  return $.extend({}, pages, {
    config: {
      flipAnimationTime: 1000
    },
  
    init: function () {
      this.prepare();
      this.bind();
    },

    prepare: function () {
      this.characters = [];
      this.clicks = {};
      this.elements = {};
      this.elements.$el = $('[data-component="board"]');
      this.elements.$locker = $('[data-component="locker"]');
    },

    bind: function () {
      mediator.subscribe('game:start', this.onGameStart, this);
      mediator.subscribe('field:click', this.onFieldClick, this);
    },

    onFieldClick: function (data) {
      if(this.isLastClick()) {
        this.recordClick('current', data);
        this.onBothClicks();
        return;
      }

      this.recordClick('last', data);
    },

    onBothClicks: function () {
      if(!this.isClicksValid()) {
        return;
      }

      // TODO: should lock screen here
      this.revealCards();
    },

    isClicksValid: function (key, data) {
      return this.clicks.last.id !== this.clicks.current.id;
    },

    isLastClick: function (key, data) {
      return !!this.clicks.last;
    },

    recordClick: function (key, data) {
      this.clicks[key] = data;
    },

    afterReveal: function () {
      console.log(this.isMatch());
    },

    isMatch: function () {
      return (this.clicks.last.name === this.clicks.current.name);
    },

    revealCards: function () {
      this.elements.$el.find('td.is-active').addClass('is-flipped');
      setTimeout($.proxy(this.afterReveal, this), this.config.flipAnimationTime);
    },

    onGameStart: function (data) {
      this.options = data;
      this.start();
    },

    start: function (data) {
      this.size = (this.options.x * this.options.y);
      this.generateCharacters();
      this.generateBoard();

      this.render();
    },

    generateBoard: function () {
      this.board = createArray(this.options.x).map($.proxy(this.createLine, this, this.options.y));
    },

    generateCharacters: function () {
      this.cards = createArray(this.size / 2).map($.proxy(function () {
        return {
          times: 0,
          name: this.getUniqueChar()
        }
      }, this));
    },

    getUniqueChar: function () {
      var character = getRandomChar();

      while (this.characters.indexOf(character) >= 0) {
        character = getRandomChar();
      }

      this.characters.push(character);

      return character;
    },

    createLine: function (size, $line) {
      var $line = createElement('tr');

      createArray(size).map($.proxy(function () {
        this.clearCardList();
        this.actual = getRange(0, this.cards.length);
        this.increaseCardTimes();
        $line.append(this.getFieldElement());
      }, this));

      return $line;
    },

    clearCardList: function (size) {
      this.cards = this.cards.filter(function (card) {
        return card.times < 2;
      });
    },

    render: function (size) {
      this.elements.$el.html(this.board).addClass('ui-board--slide-in-fade');
    },

    increaseCardTimes: function () {
      this.cards[this.actual].times++;
    },

    getActualCardName: function () {
      return this.cards[this.actual].name;
    },

    getFieldElement: function () {
      return new Field({
        name: this.getActualCardName()
      }).elements.$el;
    }

  });

});
