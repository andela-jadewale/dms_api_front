
  'use strict';

  var HostAddress = require('./HostName');
  var Token = require('./Token.js');
  var request = require('superagent');
  var mock = require('superagent-mocker')(request);

  var requestToServer = function(req) {
    if(!window.localStorage || window.test) {
      HostAddress = 'http://localhost:9001';
      mockedServer(req);
      return;
    }
    switch(req.type) {
      case 'GET': processGet(req);
      break;
      case 'POST': processPost(req);
      break;
      case 'DELETE': processDelete(req);
      break;
      case 'PUT': processUpdate(req);
      break;
    }

  };

  function processGet(req) {
    request
   .get(HostAddress + req.url)
   .query(req.query)
   .set('x-access-token', Token.getToken() ||
    window.localStorage.getItem('token'))
   .end(function(err, res) {
     if (err || !res.ok) {
       req.cb(err);
     } else {
       req.cb(res.body);
     }
   });
  }

  function processPost(req) {
    request
   .post(HostAddress + req.url)
   .send(req.body)
   .set('x-access-token', Token.getToken() ||
    window.localStorage.getItem('token'))
   .end(function(err, res) {
     if (err || !res.ok) {
       req.cb(err);
     } else {
       req.cb(res.body);
     }
   });
  }

  function processDelete(req) {
    request
   .del(HostAddress + req.url)
   .send(req.body)
   .set('x-access-token', Token.getToken() ||
    window.localStorage.getItem('token'))
   .end(function(err, res) {
     if (err || !res.ok) {
       req.cb(err);
     } else {
       req.cb(res.body);
     }
   });
  }

  function processUpdate(req) {
    request
   .put(HostAddress + req.url)
   .send(req.body)
   .set('x-access-token', Token.getToken() ||
    window.localStorage.getItem('token'))
   .end(function(err, res) {
     if (err || !res.ok) {
       req.cb(res);
     } else {
       req.cb(res.body);
     }
   });
  }

  module.exports = requestToServer;


  function mockedServer(req) {
    switch(req.type) {
      case 'GET': testGet(req);
      break;
      case 'POST': testPost(req);
      break;
      case 'DELETE': testDelete(req);
      break;
      case 'PUT': testPut(req);
      break;
    }
  }


  mock.post('/api/v1/roles/', function(req) {
         return {
          body: [{'title': 'Administrator', 'id': 1},
              {'title': 'User', 'id' : 2},
              {'title': 'Guest', 'id' : 3}]
        };
  });

 mock.get('/api/v1/roles/', function(req) {
         return {
          body: [{'title': 'Administrator', 'id': 1},
              {'title': 'User', 'id' : 2},
              {'title': 'Guest', 'id' : 3}]
        };
  });

 mock.post('/api/v1/users/', function(req) {
         return {
          body: [{'title': 'Administrator', 'id': 1},
              {'title': 'User', 'id' : 2},
              {'title': 'Guest', 'id' : 3}]
        };
  });

 mock.post('/api/v1/documents/', function(req) {
         return {
          body: [{'title': 'Administrator', 'id': 1},
              {'title': 'User', 'id' : 2},
              {'title': 'Guest', 'id' : 3}]
        };
  });

 mock.post('/api/v1/users/login', function(req) {
         return {
          body: [{'title': 'Administrator', 'id': 1},
              {'title': 'User', 'id' : 2},
              {'title': 'Guest', 'id' : 3}]
        };
  });

  mock.get('/api/v1/users/null/documents/', function(req) {
    return {
      body: 'docs'
    };
 });

 mock.get('/api/v1/documents/undefined', function(req) {
  return {
    body: 'docs'
  };
 });

 mock.put('/api/v1/documents/undefined', function(req) {
  return {
    body: 'docs'
  };
 });

 mock.put('/api/v1/users/Adewale', function(req) {
  return {
    body: 'docs'
  };
 });


 function testPut(req) {
  if(req.url === '/api/v1/documents/undefined') {
      req.cb({'doc': {'ownerId': 'hdhd',
      'title': 'test doc', 'access': ['Admin'], 'content':
       'Hello world',
      'name': {'last': 'Ade', 'first': 'jolaade'} }});
    }

    if(req.url === '/api/v1/users/Adewale') {
      req.cb({'data': {'name':{'first':'Adewale', 'last': 'lol'},
        'username': 'Adewale'}});
    }

  request
   .put(req.url)
   .send(req.body)
   .set('x-access-token', Token.getToken() ||
    window.localStorage.getItem('token'))
   .end(function(err, res) {
     if (err || !res.ok) {
       req.cb(res);
     } else {
       req.cb(res.body);
     }
   });
 }
  function testGet(req) {
    if(req.url === '/api/v1/roles/') {
      req.cb([{'title': 'Administrator', 'id': 1},
          {'title': 'User', 'id' : 2},
          {'title': 'Guest', 'id' : 3}]);
      return;
    }

    if(req.url === '/api/v1/documents/undefined') {

      req.cb({'data': {'ownerId': 'hdhd',
      'title': 'test doc', 'access': ['Admin'], 'content':
       'Hello world',
      'name': {'last': 'Ade', 'first': 'jolaade'} }});
      return;
    }

    if(req.url === '/api/v1/users/null/documents/') {
      req.cb({'data': [{'title': 'Document', 'content': 'Hello World',
        'id': '1',
      'ownerId': '24', 'access': ['Administrator']}]});
      return;
    }

    console.log(req.url, 'is informative');

    request
   .get(req.url)
   .query(req.query)
   .set('x-access-token', Token.getToken() ||
    window.localStorage.getItem('token'))
   .end(function(err, res) {
     if (err || !res.ok) {
       req.cb(err);
     } else {
      req.cb(res.body);
     }
   });
  }

  function testDelete(req) {
    request
   .del(req.url)
   .send(req.body)
   .set('x-access-token', Token.getToken() ||
    window.localStorage.getItem('token'))
   .end(function(err, res) {
     if (err || !res.ok) {
       req.cb(err);
     } else {
       req.cb(res.body);
     }
   });
  }

  function testPost(req) {

    if(req.url === '/api/v1/roles/') {
      req.cb({'role': 'user created'});
    }

    if(req.url === '/api/v1/users/') {
      req.cb({'message': 'user created'});
    }

    if(req.url === '/api/v1/documents/') {
      req.cb({'message': 'user created'});
    }


    if(req.url === '/api/v1/users/login') {
      req.cb({'token': 'jhdhjd', 'data': {'_id': 'hdhd',
      'username': 'Adewale', 'role': 'Admin', 'email': 'jbadewale@yahoo.com',
      'name': {'last': 'Ade', 'first': 'jolaade'} }});
    }

     request
   .post(req.url)
   .send(req.body)
   .set('x-access-token', Token.getToken() ||
    window.localStorage.getItem('token'))
   .end(function(err, res) {
     if (err || !res.ok) {
       req.cb(err);
     } else {
       req.cb(res.body);
     }
   });
  }

