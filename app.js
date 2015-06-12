;(function (root, helpers) {
  var levels = {
    dumb: {
      size: 2,
      charSize: 2
    },

    easy: {
      size: 4,
      charSize: 2
    },

    medium: {
      size: 6,
      charSize: 4
    },

    hard: {
      size: 4,
      charSize: 1
    },
    expert: {
      size: 10,
      charSize: 8
    }
  };

  function App (options) {
    this.options = options;
    this.prepare();
    this.bind();
  }

  App.prototype.prepare = function () {
    this.el = document.querySelector(this.options.el);
    this.level = this.el.querySelector('[name="level"]');
    this.start = this.el.querySelector('[name="start"]');
  };

  App.prototype.bind = function () {
    this.start.addEventListener('click', this.onClickStart.bind(this), false);
  };

  App.prototype.onClickStart = function (event) {
    this.data = this.getData(this.level.value);
    this.init();
    return false;
  };

  App.prototype.clear = function (value) {
    debugger;
  };

  App.prototype.init = function (value) {
    this.game = new MemoryMatch(this.data);
  };

  App.prototype.getData = function (value) {
    return {
      x: levels[value].size,
      y: levels[value].size,
      charSize: levels[value].charSize,
      el: 'table',
      lock: '.screen-lock'
    }
  };

  root.App = new App({
    el: '.setup'
  })

} (window, window.helpers));
