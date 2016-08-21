global.window.localStorage = {'getItem': function () {
  'use strict';
  return null;
}};
global.window.tinyMCE = {};
global.window.test = true;

(function () {
  jest.dontMock('../../../app/stores/Role.jsx');
  jest.dontMock('../../../app/dispatcher/dispatcher.js');
  jest.dontMock('../../../app/actions/Role.jsx');
  jest.dontMock('../../FakeComponent.js');
  jest.dontMock('../../../app/services/DataSource.js');

  var AppDispatcher;
  var RoleStore;
  var callback;
  var Action;
  var FakeComponent;
  var signUp;
  var DataSource;

  describe('Successful show create role dialog', function() {
    var roles = {};
    RoleStore = require('../../../app/stores/Role.jsx');
    RoleStore.onChange(function(role){
      roles.view = role.view;
    });
    AppDispatcher = require('../../../app/dispatcher/dispatcher.js');
    Action = require('../../../app/actions/Role.jsx');
    FakeComponent = require('../../FakeComponent.js');
    Action.emitAction({'self': FakeComponent, 'type': 'Show'});
    it("should show open dialog state has been added and shows", function() {
      expect(FakeComponent.getState().length).toBe(4);
    });

    it('sets open dialog state to open ', function() {
      expect(FakeComponent.getState()[0].show).toBe(true);
    });

    it('checks user view is documents', function () {
      expect(roles.view).toBe('show role');
    })

  });

   describe('Successful add role dialog', function() {
    var roles = '';
    var roles = {};
    RoleStore = require('../../../app/stores/Role.jsx');
    RoleStore.onChange(function(role){
      roles.view = role.view;
    });
    AppDispatcher = require('../../../app/dispatcher/dispatcher.js');
    Action = require('../../../app/actions/Role.jsx');
    FakeComponent = require('../../FakeComponent.js');
    Action.emitAction({'self': FakeComponent, 'type': 'Show'});
    Action.emitAction({'self': FakeComponent, 'type': 'Add'});

    it('checks user view is documents', function () {
      expect(roles.view).toBe('show role');
    })

  });

})();
