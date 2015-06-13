;(function (root, helpers) {

  function MemoryMatch (options) {
    this.options = options;
    this.prepare();
    this.start();
    this.render();
  }

  MemoryMatch.prototype.prepare = function () {
    this.el = document.querySelector(this.options.el);
    this.screen = document.querySelector(this.options.lock);
    this.clicks = {};
    this.matches = 0;

    // move
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
      this.el.appendChild(element);
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
    helpers.addClass(this.screen, 'is-active');
  };

  MemoryMatch.prototype.unlockScreen = function () {
    helpers.removeClass(this.screen, 'is-active');
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
    this.filterBySelector(this.getClicksSelector(), function (field) {
      helpers.addClass(field, 'is-matched');
    }.bind(this));
  };

  MemoryMatch.prototype.getClicksSelector = function () {
    return '#' + this.clicks.last.id + ' ,#' + this.clicks.current.id;
  };

  MemoryMatch.prototype.reveal = function (fn) {
    this.filterBySelector('td.is-active', function (field) {
      helpers.addClass(field, 'is-flipped');
    }.bind(this));

    // change it to animation over
    setTimeout(fn, 1100);
  };

  MemoryMatch.prototype.filterBySelector = function (filter, fn) {
    [].forEach.call(this.el.querySelectorAll(filter), fn);
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
    this.filterBySelector('td.is-flipped', function (field) {
      if (!helpers.hasClass(field, 'is-matched')) {
        field.className = "";
      }
    });

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

  root.MemoryMatch = MemoryMatch;

} (window, window.helpers));
