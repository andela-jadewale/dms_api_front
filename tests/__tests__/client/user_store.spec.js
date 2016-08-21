global.window.localStorage = {'getItem': function () {
  'use strict';
  return null;
}, 'setItem': function () {
  return null;
}};

global.window.tinyMCE = {};

global.window.test = true;


(function () {
  jest.dontMock('../../../app/stores/User.jsx');
  jest.dontMock('../../../app/dispatcher/dispatcher.js');
  jest.dontMock('../../../app/actions/User.jsx');
  jest.dontMock('../../FakeComponent.js');
  jest.dontMock('../../../app/components/SignUp.jsx');

  var AppDispatcher;
  var UserStore;
  var callback;
  var Action;
  var FakeComponent;
  var signUp;
  var Component;
  var React = require('react'),
    enzyme = require('enzyme'),
    shallow = require('enzyme').shallow,
    mount = require('enzyme').mount,
    SignUp = require('../../../app/components/SignUp.jsx');

  describe('Successful Edit Dialog', function() {
    var log = {};
      UserStore = require('../../../app/stores/User.jsx');
      Component = require('../../FakeComponent.js');
      Action = require('../../../app/actions/User.jsx');
      FakeComponent = require('../../FakeComponent.js');
      var params = {'username': 'Kenny', 'password': 'Kenny'};
      UserStore.setSelf(FakeComponent);
      Action.emitAction(params, 'LogIn');
      UserStore.onChange(function (user) {
        log.view = user.view;
      });
      Component = require('../../FakeComponent.js');
      Action = require('../../../app/actions/User.jsx');
      Action.emitAction({'self': Component, 'id': '1234'},
        'Edit');

    it('checks user view is edit', function () {
      expect(log.view).toBe('Edit Confirmed');
    })

  });

  describe('Successful Edit Confirmed', function() {

      var users = {};
      UserStore = require('../../../app/stores/User.jsx');
      Component = require('../../FakeComponent.js');
      Action = require('../../../app/actions/User.jsx');
      FakeComponent = require('../../FakeComponent.js');
      var params = {'username': 'Kenny', 'password': 'Kenny'};
      UserStore.setSelf(FakeComponent);
      Action.emitAction(params, 'LogIn');
      UserStore.onChange(function (user) {
        users.view = user.view;
      });
      Component = require('../../FakeComponent.js');
      Action = require('../../../app/actions/User.jsx');
      Action.emitAction({'self': Component, 'id': {'name':{'first':'Adewale', 'last': 'lol'},
        'username': 'Adewale'}},
        'Edit');
       Action.emitAction(Component,
            'ConfirmEdit');

    it('checks user view is edit', function () {
      expect(users.view).toBe('Edit Confirmed');
    })
  });

})();

