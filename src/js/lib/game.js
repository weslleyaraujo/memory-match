define([
  'lib/field',
  'lib/pages',
  'shared/mediator',
  'shared/create-array',
  'shared/get-random-char',
  'shared/get-range',
  'shared/create-element',

], function(Field, pages, mediator, createArray, getRandomChar, getRange, createElement) {

  return $.extend({}, pages, {
  
    init: function () {
      this.prepare();
      this.bind();
    },

    prepare: function () {
      this.elements = {};
      this.elements.$el = $('[data-component="board"]');
      this.$locker = $('[data-component="locker"]');
    },

    bind: function () {
      mediator.subscribe('game:start', this.onGameStart, this);
    },

    onGameStart: function (data) {
      this.options = data;
      this.start();
    },

    start: function (data) {
      this.characters = [];
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
      this.elements.$el.html(this.board);
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
