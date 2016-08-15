var dispatcher = require('../dispatcher/dispatcher.js');
var DataSource = require('../services/DataSource.js');
var UserHelper = require('../services/Users.js');
var url = '/api/v1/roles/';
var eventEmitter = {};

function Role() {
  'use strict';
  var listeners = [];

  function triggerListeners() {
    var role = {};
    listeners.forEach(function(listener) {
      listener(role);
    });
  }

  function getEventEmitter(obj) {
    eventEmitter = obj.data.self;
  }

  function showRole(obj) {
    getEventEmitter(obj);
    obj.data.self.setState({show: true});
  }

  function addRole(obj) {
    UserHelper.sendRequest(url, 'POST', DataSource.getContent(), processRoles);
  }

  function processRoles(res) {

    if(res.role) {
      eventEmitter.setState({message: 'role created'});
      eventEmitter.setState({snack: true});
    }
    else{
      eventEmitter.setState({message: 'Error creating role'});
      eventEmitter.setState({snack: true});
    }

  }
  function onChange(listener) {
    listeners.push(listener);
  }

  dispatcher.register(function (e) {
    var split = e.type.split(':');
    if(split[0] === 'Role') {
      switch(split[1]) {
        case 'Add': addRole({'data': e.payload});
        break;
        case 'Show': showRole({'data': e.payload});
        break;

      }
    }
  });

  return {
    onChange: onChange
  };
}

module.exports = new Role();