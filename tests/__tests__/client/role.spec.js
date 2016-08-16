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
    var roles = '';
    beforeEach(function(done) {
      RoleStore = require('../../../app/stores/Role.jsx');
      AppDispatcher = require('../../../app/dispatcher/dispatcher.js');
      Action = require('../../../app/actions/Role.jsx');
      FakeComponent = require('../../FakeComponent.js');
      Action.emitAction({'self': FakeComponent, 'type': 'Show'});
      RoleStore.onChange(function (role) {
        roles = role;
        done();
      });
    });

    it('registers a callback with the dispatcher', function() {
      expect(Object.keys(AppDispatcher.length()).length).toBe(1);
    });

    it("should show open dialog state has been added and shows", function() {
        expect(FakeComponent.getState().length).toBe(1);
    });

    it('sets open dialog state to open ', function() {
      expect(FakeComponent.getState()[0].show).toBe(true);
    });

    it('checks user view is documents', function (done) {
      expect(roles.view).toBe('show role');
      done();
    })

  });

   describe('Successful add role dialog', function() {
    var roles = '';
    beforeEach(function(done) {
      RoleStore = require('../../../app/stores/Role.jsx');
      AppDispatcher = require('../../../app/dispatcher/dispatcher.js');
      Action = require('../../../app/actions/Role.jsx');
      var fakeComponent = require('../../FakeComponent.js');
      FakeComponent = require('../../FakeComponent.js');
      console.log(FakeComponent, 'is what')
      DataSource = require('../../../app/services/DataSource.js');
      DataSource.setContent({'title': 'Resources'});
      Action.emitAction({'self': FakeComponent, 'type': 'Show'});
      Action.emitAction({'self': fakeComponent, 'type': 'Add'});
      RoleStore.onChange(function (role) {
        roles = role;
        done();
      });
    });

    it('registers a callback with the dispatcher', function() {
      expect(Object.keys(AppDispatcher.length()).length).toBe(1);
    });

    console.log(FakeComponent, 'is fake');
    console.log(fakeComponent, 'is real');
    it("should show open dialog state has been added and shows", function() {
        expect(FakeComponent.getState().length).toBe(2);
    });

    it('sets open dialog state to open ', function() {
      expect(FakeComponent.getState()[0].message).toBe('role created');
    });

    it('checks user view is documents', function (done) {
      expect(roles.view).toBe('show role');
      done();
    })

  });

})();