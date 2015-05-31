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
		return false;
	};

	Field.prototype.toggleClass = function (el, className) {
		var regex = new RegExp(className, 'g');
		if (el.className.match(regex)) {
			el.className = el.className.replace(regex, '');
			return;
		}
		
		el.className  = (' ' + className);
	};

	Field.prototype.prepare = function () {
		this.el = document.createElement('td');
		this.name = this.options.name;
	};

	Field.prototype.start = function () {
		this.el.innerHTML = this.name;
	};
	
	root.Field = Field;

} (window));
