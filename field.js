;(function (root) {

  function Field (options) {
    this.options = options;
    this.prepare();
    this.bind();
    this.start();
    return this;
  }

  Field.prototype.bind = function () {
    this.el.addEventListener('click', this.onClick.bind(this), false);
  };

  Field.prototype.onClick = function (event) {
    this.toggleClass(event.currentTarget, 'is-active');

    /* already active? */
    if (typeof this.afterClick === 'function') {
      this.afterClick();
    }

    return false;
  };

  Field.prototype.registerClick = function (fn) {
    this.afterClick = fn;
  };

  Field.prototype.hasClass = function(el, className) {
    var regex = new RegExp(className, 'g');
    return el.className.match(regex);
  };

  Field.prototype.toggleClass = function (el, className) {
    var regex = new RegExp(className, 'g');
    if (el.className.match(regex)) {
      el.className = el.className.replace(regex, '');
      return;
    }

    el.className  = (' ' + className);
  };

  Field.prototype.createElements = function () {
    this.front = document.createElement('figure');
    this.back  = document.createElement('figure');
    this.el    = document.createElement('td');

    this.front.className = 'is-front';
    this.back.className = 'is-back';

    this.el.appendChild(this.front);
    this.el.appendChild(this.back);
  };

  Field.prototype.prepare = function () {
    this.createElements();
    this.name = this.options.name;
  };

  Field.prototype.start = function () {
    this.back.innerHTML = this.name;
    this.front.innerHTML = "lol";
  };

  root.Field = Field;

} (window));
