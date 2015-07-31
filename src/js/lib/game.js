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
      flipAnimationTime: 1000,
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
        return this.clicks.last.id === data.id;
      } catch(e) {
        return false;
      }
    },

    onGameAbort: function () {
      this.changePage('initial').done($.proxy(function () {
        this.abort();
      }, this));
    },

    onEasterEgg: function () {
      mediator.publish('easteregg:show');
    },

    onCardClick: function (data) {
      if (this.isEqualClick(data)) {
        this.clearClicks();
        return;
      }

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

      mediator.publish('locker:active');
      this.revealCards();
    },

    isClicksValid: function () {
      return this.clicks.last.id !== this.clicks.current.id;
    },

    isLastClick: function () {
      return !!this.clicks.last;
    },

    recordClick: function (key, data) {
      this.clicks[key] = data;
    },

    clearClicks: function () {
      this.clicks = {};
    },

    unflipCards: function () {
      this.elements.$el.find('td.is-flipped').removeClass('is-flipped is-active');
    },

    addMatch: function () {
      this.matches++;
    },

    afterReveal: function () {
      if(this.isMatch()) {
        this.afterMatched();
        return;
      }

      this.clearClicks();
      this.unflipCards();
      this.removeLocker();
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
      this.changePage('win', function () {
        mediator.publish('game:win');
      });
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

    revealCards: function () {
      this.elements.$el.find('td.is-active').addClass('is-flipped');
      setTimeout($.proxy(this.afterReveal, this), this.config.flipAnimationTime);
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
      this.size = (this.options.x * this.options.y);
      this.generateCharacters();
      this.generateBoard();

      this.render();
      this.setLineHeight();
    },

    generateBoard: function () {
      this.board = createArray(this.options.x).map($.proxy(this.createLine, this, this.options.y));
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
