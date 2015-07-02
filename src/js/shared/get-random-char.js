define([], function () {
  return function (charSize) {
    charSize = charSize || 1;

    return Math.random()
      .toString(36)
      .replace(/[0-9]/g, '')
      .replace(/\./g, '')
      .slice(0, charSize)
      [(Math.random()<0.5) ? 'toUpperCase' : 'toString']();
  };
});
