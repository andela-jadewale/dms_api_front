var errors = {};

var setData = function (obj) {
  'use strict';
  errors.message = obj;
};

var getData = function () {
  'use strict';
  return errors.message;
};

module.exports = {
  setData: setData,
  getData: getData
};