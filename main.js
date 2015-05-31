;(function (root) {

  function App (options) {
    this.options = options;
    this.prepare();
    this.start();
    this.render();
  }

  App.helpers = {};

  App.helpers.getName = function () {
    return Math.random()
  .toString(36)
  .replace(/[0-9]/g, '')
  .replace(/\./g, '');
  };

  App.helpers.getRange = function (initial, to) {
    return Math.floor(Math.random() * to) + initial;
  };

  App.prototype.prepare = function () {
    this.el = document.querySelector(this.options.el);
    this.clickCount = 0;
    this.size = (this.options.x * this.options.y);
    this.cards = this.getArray(this.size / 2).map(function () {
      return {
        times: 0,
      name: App.helpers.getName()
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
      actual = App.helpers.getRange(0, this.cards.length);
      this.cards[actual].times++;

      field = new Field({
        name: this.cards[actual].name
      });

      field.registerClick(this.afterActive.bind(this));

      el.appendChild(field.el);
    }.bind(this));

    return el;

    }.bind(this));
  };

  App.prototype.afterActive = function () {
    this.clickCount++;
    if (this.clickCount === 2) {
      alert('reveal');
      this.clickCount = 0;
    }
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

} (window));
