define(['jquery'], function ($) {
  return function (tagname, data) {
    return $('<' + tagname + '/>', data || {});
  };
});
