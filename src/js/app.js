;(function (root, helpers) {
  var levels = {
    dumb: {
      size: 2,
    },

    easy: {
      size: 4,
    },

    medium: {
      size: 6,
    },

    hard: {
      size: 4,
    },
    expert: {
      size: 10,
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
    this.game = null;
  };

  App.prototype.bind = function () {
    this.start.addEventListener('click', this.onClickStart.bind(this), false);
  };

  App.prototype.onClickStart = function (event) {
    this.clear();
    this.data = this.getData(this.level.value);
    this.init();
    return false;
  };

  App.prototype.clear = function (value) {
    try {
      this.game.el.innerHTML = "";
    } catch (e) {}
  };

  App.prototype.init = function (value) {
    this.clear();
    this.game = new MemoryMatch(this.data);
  };

  App.prototype.getData = function (value) {
    return {
      x: levels[value].size,
      y: levels[value].size,
      el: 'table',
      lock: '.screen-lock'
    };
  };

  root.App = new App({
    el: '.setup'
  });

} (window, window.helpers));
