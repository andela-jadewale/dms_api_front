
  var User = require('./ParseUsers.js'),
    Request = require('./xhrRequest.js'),
    Errors = require('./Error.js');

  module.exports =  {
    logIn: function (url, type, params, cb) {
      'use strict';
      User.logUserIn(params)? sendRequest(url, type, params, cb):
       cb(Errors.getData());
    },

     signUp: function (url, type, params, cb) {
      'use strict';
      User.signUp(params) ? sendRequest(url, type, params, cb):
       cb(Errors.getData());
    },
    sendRequest: function (url, type, params, cb) {
      'use strict';
      sendRequest(url, type, params, cb);
    },
  };

  function sendRequest(url, type, params, cb) {
    'use strict';
    Request(buildRequest(url, type, params, cb));
  }

  function buildRequest(url, type, params, cb) {
    'use strict';
    if(url.indexOf('?') !== -1) {
      return {
        'url': url.split('?')[0],
        'type': type,
        'query': url.split('?')[1],
        'cb': cb
      };
    }
    return {
      'url': url,
      'type': type,
      'body': params,
      'cb': cb
    };
  }



