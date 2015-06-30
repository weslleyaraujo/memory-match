define([], function () {
  return function (length) {
    return Array.apply(null, {
      length: length
    });
  };
});
