define([], function () {

  var subscriptions = {},
  Mediator = function() {};

  Mediator.prototype.subscribe = function(key, callback, context) {
    subscriptions[key] = subscriptions[key] || [];

    subscriptions[key].push({
      callback: callback,
      context: context || window
    });
  };

  Mediator.prototype.publish = function(key, params) {
    var length;

    if(!subscriptions[key]) {
      return;
    }

    length = subscriptions[key].length;

    for(var i = 0; i < length; i += 1) {
      subscriptions[key][i].callback.call(subscriptions[key][i].context, params);
    }
  };

  return new Mediator();

});
