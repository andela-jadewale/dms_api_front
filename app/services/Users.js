
  var User = require('./ParseUsers.js'),
    Request = require('./xhrRequest.js');

  module.exports =  {
    logIn: function (url, type, params, cb) {
      'use strict';
      User.logUserIn(params)? sendRequest(url, type, params, cb): cb(Errors());
    },

     signUp: function (url, type, params, cb) {
      'use strict';
      User.signUp(params)? sendRequest(url, type, params, cb): cb(Errors());
    },

    roles: function (url, type, params, cb) {
      'use strict';
      sendRequest(url, type, params, cb);
    },

    updateUser: function (url, type, params, cb) {
      'use strict';
      sendRequest(url, type, params, cb);
    },

    createDoc: function (url, type, params, cb) {
      'use strict';
      sendRequest(url, type, params, cb);
    },

    getDoc: function (url, type, params, cb) {
      'use strict';
      sendRequest(url, type, params, cb);
    },

    sendRequest: function (url, type, params, cb) {
      'use strict';
      sendRequest(url, type, params, cb);
    },
  };
    function Errors() {
      'use strict';
      return 'Please All details are required';
    }

    function sendRequest(url, type, params, cb) {
      'use strict';
      Request(buildRequest(url, type, params, cb));
    }

    function request(req) {
      'use strict';
      Request(req);
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



