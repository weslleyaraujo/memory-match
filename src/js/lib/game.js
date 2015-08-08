define([
  'jquery',
  'konami',
  'lib/card',
  'lib/pages',
  'lib/easter-egg',
  'shared/mediator',
  'shared/create-array',
  'shared/get-random-char',
  'shared/get-range',
  'shared/create-element',

], function(jquery, konami, Card, pages, easterEgg, mediator, createArray, getRandomChar, getRange, createElement) {

  return $.extend(true, {}, pages, {
    config: {
      el: '[data-component="board"]',
      delayTime: 800,
      animationClass: 'ui-board--slide-in-fade'
    },
  
    init: function () {
      this.prepare();
      this.bind();

      // not assigning to any variable here :(
      new Konami($.proxy(this.onEasterEgg));
    },

    prepare: function () {
      this.matches = 0;
      this.characters = [];
      this.clicks = {};
      this.elements = {};
      this.elements.$el = $(this.config.el);
      this.elements.$window  = $(window);
    },

    bind: function () {
      mediator.subscribe('game:start', this.onGameStart, this);
      mediator.subscribe('game:abort', this.onGameAbort, this);
      mediator.subscribe('card:click', this.onCardClick, this);
      this.elements.$window.on('resize', $.proxy(this.onWindowResize, this));
    },

    onWindowResize: function() {
      this.setLineHeight();
    },

    /*
     * FIXME: Think in a smart way to do that
     */
    setLineHeight: function() {
      this.elements.$el.find('figure').each(function() {
        var $target = $(this);
        var height = $target.height();
        var width = $target.width();
        var fontSize;

        $target.css('lineHeight', $target.height() + 'px');

        if(height > width) {
          fontSize = height - (height * 0.30);
          $target.css('fontSize', fontSize + 'px');
          return;
        }

        fontSize = width - (width * 0.50);
        $target.css('fontSize', fontSize + 'px');
      });
    },

    isEqualClick: function (data) {
      try {
        return this.clicks.current.id === data.id;
      } catch(e) {
        return false;
      }
    },

    onGameAbort: function () {
      this.abort();
    },

    onEasterEgg: function () {
      mediator.publish('easteregg:show');
    },

    onCardClick: function(data) {
      if (this.isEqualClick(data)) {
        this.clearClicks();
        this.unflipCards();

        return;
      }

      if(!this.isFirstClick()) {
        this.recordClick('current', data);
        this.reveal(data);
        return;
      }

      this.reveal(data);
      this.recordClick('last', data);
      this.onBothClicks();
    },

    reveal: function(data) {
      this.elements.$el.find('#' + data.id).addClass('is-flipped');
    },

    onBothClicks: function () {
      mediator.publish('locker:active');

      setTimeout($.proxy(function () {
        if(this.isMatch()) {
          this.afterMatched();
          return;
        }

        this.clearClicks();
        this.unflipCards();
        this.removeLocker();
      }, this), this.config.delayTime);
    },

    isFirstClick: function () {
      return !!this.clicks.current;
    },

    recordClick: function (key, data) {
      this.clicks[key] = data;
    },

    clearClicks: function () {
      this.clicks = {};
    },

    unflipCards: function () {
      this.elements.$el.find('td.is-flipped, td.is-active')
        .removeClass('is-flipped is-active');
    },

    addMatch: function () {
      this.matches++;
    },

    afterMatched: function () {
      this.addMatch();
      this.flagMatchs();
      this.clearClicks();
      this.removeLocker();

      if(this.isWinner()) {
        this.onWinGame();
      }
    },

    removeLocker: function() {
      mediator.publish('locker:remove');
    },

    onWinGame: function() {
      this.changePage('win').done($.proxy(function () {
        mediator.publish('game:win', {
          index: this.options.index
        });
      }, this));
    },

    isWinner: function() {
      return this.matches === (this.size / 2);
    },

    flagMatchs: function () {
      this.elements.$el.find(this.getMatchSelector()).addClass('is-matched');
    },

    getMatchSelector: function () {
      return '#' + this.clicks.last.id + ' ,#' + this.clicks.current.id;
    },

    isMatch: function () {
      return this.clicks.last.name === this.clicks.current.name;
    },

    onGameStart: function (data) {
      this.options = data;
      this.start();
    },

    abort: function () {
      this.elements.$el
        .empty()
        .removeClass(this.config.animationClass);

      this.prepare();
    },

    start: function (data) {
      this.size = (this.options.size * this.options.size);
      this.generateCharacters();
      this.generateBoard();

      this.render();
      this.setLineHeight();
    },

    generateBoard: function () {
      this.board = createArray(this.options.size).map($.proxy(this.createLine, this, this.options.size));
    },

    generateCharacters: function () {
      this.cards = createArray(this.size / 2).map($.proxy(function () {
        return {
          times: 0,
          name: this.getUniqueChar()
        };
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

    createLine: function (size) {
      var $line = createElement('tr');

      createArray(size).map($.proxy(function () {
        this.clearCardList();
        this.actual = getRange(0, this.cards.length);
        this.increaseCardTimes();
        $line.append(this.getCardElement());
      }, this));

      return $line;
    },

    clearCardList: function (size) {
      this.cards = this.cards.filter(function (card) {
        return card.times < 2;
      });
    },

    render: function (size) {
      this.elements.$el.html(this.board).addClass(this.config.animationClass);
    },

    increaseCardTimes: function () {
      this.cards[this.actual].times++;
    },

    getActualCardName: function () {
      return this.cards[this.actual].name;
    },

    getCardElement: function () {
      return new Card({
        name: this.getActualCardName()
      }).elements.$el;
    }

  });

});
