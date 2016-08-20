
  'use strict';

  var HostAddress = require('./HostName');
  var Token = require('./Token.js');
  var request = require('superagent');

  var requestToServer = function(req) {

    if(!window.localStorage) {
      HostAddress = 'http://localhost:9001';
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
   .set('x-access-token', Token.getToken() || localStorage.getItem('token'))
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
   .set('x-access-token', Token.getToken() || localStorage.getItem('token'))
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
   .set('x-access-token', Token.getToken() || localStorage.getItem('token'))
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
   .set('x-access-token', Token.getToken() || localStorage.getItem('token'))
   .end(function(err, res) {
     if (err || !res.ok) {
       req.cb(res);
     } else {
       req.cb(res.body);
     }
   });
  }

  module.exports = requestToServer;

