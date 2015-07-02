define([], function () {
  return [
    'webkitAnimationEnd',
    'oanimationend',
    'msAnimationEnd',
    'animationend',
  ].join(' ');
});
