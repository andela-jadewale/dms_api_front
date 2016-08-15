var token ='';
module.exports = {

  setToken: function (obj) {
    'use strict';
    token = obj;
  },

  getToken: function () {
    'use strict';
    return token;
  }

};