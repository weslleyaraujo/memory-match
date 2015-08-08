define(function () {
  return function (initial, to) {
    return Math.floor(Math.random() * to) + initial;
  };
});
