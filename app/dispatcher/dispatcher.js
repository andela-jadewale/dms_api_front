var guid = require('guid');
var listeners = {};
module.exports = {

  register: function (cb) {
    'use strict';
    var id = guid.raw();
    listeners[id] = cb;

    return id;
  },

  dispatch: function (payload) {
    'use strict';
      for(var id in listeners) {
        var listener = listeners[id];
        listener(payload);
      }
  },

  length: function () {
    'use strict';
      return listeners;
  }
};