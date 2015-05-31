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
    this.size = (this.options.x * this.options.y);
    this.cards = this.getArray(this.size / 2).map(function () {
      return {
        times: 0,
        name: helpers.getName(this.options.charSize)
      }
    }.bind(this));
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
    if (this.clicks['last']) {
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
    this.filter(this.getClicksSelector(), function (field) {
      helpers.addClass(field, 'is-matched');
    }.bind(this));
  };

  MemoryMatch.prototype.getClicksSelector = function () {
    return '#' + this.clicks.last.id + ' ,#' + this.clicks.current.id;
  };

  MemoryMatch.prototype.reveal = function (fn) {
    this.filter('td.is-active', function (field) {
      helpers.addClass(field, 'is-flipped');
    }.bind(this));

    // change it to animation over
    setTimeout(fn, 1100);
  };

  MemoryMatch.prototype.filter = function (filter, fn) {
    [].forEach.call(this.el.querySelectorAll(filter), fn);
  };

  MemoryMatch.prototype.isMatch = function () {
    return (this.clicks.last.name === this.clicks.current.name);
  };

  MemoryMatch.prototype.isClickValid = function () {
    return !(this.clicks.last.id === this.clicks.current.id);
  };

  MemoryMatch.prototype.setClickValue = function (key, values) {
    this.clicks[key] = values;
  };

  MemoryMatch.prototype.clearFlippeds = function () {
    this.filter('td.is-flipped', function (field) {
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

  root.MemoryMatch = new MemoryMatch({
    x: 2,
    y: 2,
    charSize: 4,
    el: 'table',
    lock: '.screen-lock'
  });

} (window, window.helpers));
