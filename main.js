;(function (root, helpers) {

  function App (options) {
    this.options = options;
    this.prepare();
    this.start();
    this.render();
  }

  App.prototype.prepare = function () {
    this.el = document.querySelector(this.options.el);
    this.clicks = {};
    this.size = (this.options.x * this.options.y);
    this.cards = this.getArray(this.size / 2).map(function () {
      return {
        times: 0,
        name: helpers.getName()
      }
    });
  };

  App.prototype.render = function () {
    this.table.forEach(function (element) {
      this.el.appendChild(element);
    }.bind(this));
  };

  App.prototype.start = function () {
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
        id: this.cards[actual].name + '-' + index
      });

      field.registerClickCallback(this.afterActive.bind(this));

      el.appendChild(field.el);
    }.bind(this));

    return el;

    }.bind(this));
  };

  App.prototype.afterActive = function (field) {
    if (this.clicks['last']) {
      this.setClickValue('current', field);
      this.resultHandler();
      return;
    }

    this.setClickValue('last', field);
  };

  App.prototype.resultHandler = function () {
    if (!this.isClickValid()) {
      return;
    }

    this.reveal(function () {
      if (this.isMatch()) {
        this.setMatched();
        this.clicks = {};
        return;
      }

      this.clearFlippeds();

    }.bind(this));
  };

  App.prototype.setMatched = function (fn) {
    [].forEach.call(this.el.querySelectorAll('td.is-flipped'), function (field) {
      helpers.addClass(field, 'is-matched');
    }.bind(this));
  };

  App.prototype.reveal = function (fn) {
    [].forEach.call(this.el.querySelectorAll('td.is-active'), function (field) {
      helpers.addClass(field, 'is-flipped');
    }.bind(this));

    // change it to animation over
    setTimeout(fn, 1100);
  };

  App.prototype.isMatch = function () {
    return (this.clicks.last.name === this.clicks.current.name);
  };

  App.prototype.isClickValid = function () {
    return !(this.clicks.last.id === this.clicks.current.id);
  };

  App.prototype.setClickValue = function (key, values) {
    this.clicks[key] = values;
  };

  App.prototype.clearFlippeds = function () {
    [].forEach.call(this.el.querySelectorAll('td.is-flipped'), function (field) {
      field.className = "";
    });

    this.clicks = {};
  };

  App.prototype.clearCard = function () {
    this.cards = this.cards.filter(function (card) {
      return card.times < 2;
    });
  };

  App.prototype.getArray = function (length) {
    return Array.apply(null, {
      length: length
    });
  };

  root.App = new App({
    x: 10,
    y: 5,
    el: 'table'
  });

} (window, window.helpers));
