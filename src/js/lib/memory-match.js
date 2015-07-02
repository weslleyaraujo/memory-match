define([
    'shared/mediator'

], function(mediator) {

  function MemoryMatch (options) {
    this.options = options;
    // this.prepare();
    this.bind();
    // this.start();
    // this.render();
    return this;
  }

  MemoryMatch.prototype.bind = function () {
    mediator.subscribe('memory-match:create', $.proxy(this.onCreate, this));
  };

  MemoryMatch.prototype.onCreate = function (data) {
    console.log(data);
    debugger;
  };

  MemoryMatch.prototype.prepare = function (level) {
    this.$el = $('[data-component="board"]');
    this.$locker = $('[data-component="locker"]');
    this.clicks = {};
    this.matches = 0;
    this.createChars();
  };

  MemoryMatch.prototype.createChars = function () {
    this.characters = [];
    this.size = (this.options.x * this.options.y);

    this.cards = this.getArray(this.size / 2).map(function () {
      this.createUnique();
      return {
        times: 0,
        name: this.actualChar
      };

    }.bind(this));
  };

  MemoryMatch.prototype.createUnique = function () {
      this.actualChar = helpers.getName(this.options.charSize);

      while (this.characters.indexOf(this.actualChar) > 0) {
        this.actualChar = helpers.getName(this.options.charSize);
      }

      this.characters.push(this.actualChar);
  };

  MemoryMatch.prototype.render = function () {
    this.table.forEach(function (element) {
      this.$el.appendChild(element);
    }.bind(this));
  };

  MemoryMatch.prototype.start = function () {
    this.table = this.getArray(this.options.x).map(function () {
      var el = document.createElement('tr'),
      field,
      actual;

      this.getArray(this.options.y).map(function (value, index) {
        this.clearCard();
        actual = helpers.getRange(0, this.cards.length);

        this.cards[actual].times++;

        field = new Field({
          name: this.cards[actual].name,
          id: this.cards[actual].name + '-' + helpers.getName(this.options.charSize)
        });

        field.registerClickCallback(this.afterActive.bind(this));

        el.appendChild(field.el);
      }.bind(this));

      return el;

    }.bind(this));
  };

  MemoryMatch.prototype.afterActive = function (field) {
    if (this.clicks.last) {
      this.setClickValue('current', field);
      this.resultHandler();
      return;
    }

    this.setClickValue('last', field);
  };

  MemoryMatch.prototype.lockScreen = function () {
    this.$locker.addClass('is-active');
  };

  MemoryMatch.prototype.unlockScreen = function () {
    this.$locker.removeClass('is-active');
  };

  MemoryMatch.prototype.resultHandler = function () {
    if (!this.isClickValid()) {
      return;
    }

    this.lockScreen();
    this.reveal(function () {
      if (this.isMatch()) {
        this.matches++;
        this.setMatched();
        this.unlockScreen();
        this.clicks = {};
        this.afterMatch();
        return;
      }

      this.clearFlippeds();
      this.unlockScreen();

    }.bind(this));
  };

  MemoryMatch.prototype.afterMatch = function () {
    if (this.matches == (this.size / 2)) {
      this.wonHanlder();
    }
  };

  MemoryMatch.prototype.wonHanlder = function () {
    alert('you won!');
  };

  MemoryMatch.prototype.setMatched = function (fn) {
    this.$el.find(this.getClicksSelector()).addClass('is-matched');
  };

  MemoryMatch.prototype.getClicksSelector = function () {
    return '#' + this.clicks.last.id + ' ,#' + this.clicks.current.id;
  };

  MemoryMatch.prototype.reveal = function (fn) {
    this.$el.find('td.is-active').addClass('is-flipped');

    // change it to animation over
    setTimeout(fn, 1100);
  };

  MemoryMatch.prototype.isMatch = function () {
    return (this.clicks.last.name === this.clicks.current.name);
  };

  MemoryMatch.prototype.isClickValid = function () {
    return this.clicks.last.id !== this.clicks.current.id;
  };

  MemoryMatch.prototype.setClickValue = function (key, values) {
    this.clicks[key] = values;
  };

  MemoryMatch.prototype.clearFlippeds = function () {
    this.$el.find('td.is-flipped').removeClass('is-matched');
    this.clicks = {};
  };

  MemoryMatch.prototype.clearCard = function () {
    this.cards = this.cards.filter(function (card) {
      return card.times < 2;
    });
  };

  MemoryMatch.prototype.getArray = function (length) {
    return Array.apply(null, {
      length: length
    });
  };

  return MemoryMatch;

});
