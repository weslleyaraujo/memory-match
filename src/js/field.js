;(function (root, helpers) {

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
    console.log('wowo');
    var target = event.currentTarget;

    if (helpers.hasClass(target, 'is-active')) {
      helpers.removeClass(target, 'is-active');
      return;
    }

    helpers.addClass(target, 'is-active');

    this.afterClick({
      id: this.id,
      name: this.name
    });

    return false;
  };

  Field.prototype.registerClickCallback = function (fn) {
    this.afterClick = fn;
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
    this.el.id = this.options.id;
    this.id = this.options.id;
  };

  Field.prototype.start = function () {
    this.back.innerHTML = this.name;
    this.front.innerHTML = "";
  };

  root.Field = Field;

} (window, window.helpers));
