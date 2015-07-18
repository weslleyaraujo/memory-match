define([], function () {
  return function(fn, context) { 
    var result;
    return function() { 
      if(fn) {
        result = fn.apply(context || this, arguments);
        fn = null;
      }
      return result;
    };
  }
});
