(function (){
  jest.dontMock('../../../app/stores/Document.jsx');
  jest.dontMock('../../../app/dispatcher/dispatcher.js');
  jest.dontMock('../../../app/actions/DocManagementActionCreator.jsx');
  jest.dontMock('../../FakeComponent.js');
  jest.dontMock('../../../app/components/SignUp.jsx');
  jest.dontMock('../../../app/stores/User.jsx');
  jest.dontMock('../../../app/actions/User.jsx');
  jest.dontMock('../../../app/components/AddDocuments.jsx');

  var AppDispatcher;
  var UserStore;
  var DocStore;
  var callback;
  var Action;
  var FakeComponent;
  var Component;
  var DocAction;
  var docs;
  var addDocument;
  var title = 'hello world is new';
  var React = require('react'),
    enzyme = require('enzyme'),
    shallow = require('enzyme').shallow,
    mount = require('enzyme').mount,
    AddDocs = require('../../../app/components/AddDocuments.jsx');

  describe('Create Document', function () {

    beforeEach(function (done) {
      UserStore = require('../../../app/stores/User.jsx');
      AppDispatcher = require('../../../app/dispatcher/dispatcher.js');
      var params = {'username': 'Kenny', 'password': 'Kenny'};
      Action = require('../../../app/actions/User.jsx');
      FakeComponent = require('../../FakeComponent.js');
      DocAction = require('../../../app/actions/DocManagementActionCreator.jsx');
      UserStore.setSelf(FakeComponent);
      Action.emitAction(params, 'LogIn');
      UserStore.onChange(function (user) {
        users = user;
        DocStore = require('../../../app/stores/Document.jsx');
        Component = require('../../FakeComponent.js');
        addDocument = shallow(<AddDocs/>);
        DocStore.setSelf(addDocument);
        DocumentData = {'title': title, 'role': 'Administrator',
         'content': 'Hello World'};
        DocStore.setData(DocumentData);
        DocAction.save(Component);
        DocStore.onChange(function (doc) {
          docs = doc;
          done();
        })
      });
    });

    it('registers a callback with the dispatcher', function() {
      expect(Object.keys(AppDispatcher.length()).length).toBe(1);
    });

    it("should check states length", function() {
      expect(Component.getState().length).toBe(3);
    });

    it('checks snack is set to true ', function() {
      expect(Component.getState()[2].open).toBe(true);
    });

    it('test document has been created ', function(done) {
      expect(docs.view).toBe('documents');
      done();
    });


    })

  describe('Find Document', function () {

    beforeEach(function (done) {
      UserStore = require('../../../app/stores/User.jsx');
      AppDispatcher = require('../../../app/dispatcher/dispatcher.js');
      var params = {'username': 'Kenny', 'password': 'Kenny'};
      Action = require('../../../app/actions/User.jsx');
      FakeComponent = require('../../FakeComponent.js');
      DocAction = require('../../../app/actions/DocManagementActionCreator.jsx');
      UserStore.setSelf(FakeComponent);
      Action.emitAction(params, 'LogIn');
      UserStore.onChange(function (user) {
        users = user;
        DocStore = require('../../../app/stores/Document.jsx');
        Component = require('../../FakeComponent.js');
        addDocument = shallow(<AddDocs/>);
        DocStore.setSelf(Component);
        DocAction.find({'value': title, 'data': Component});
        DocStore.onChange(function (doc) {
          docs = doc;
          done();
        })
      });
    });

    it('registers a callback with the dispatcher', function() {
      expect(Object.keys(AppDispatcher.length()).length).toBe(1);
    });

    it("should check states length", function() {
      expect(Component.getState().length).toBe(3);
    });

    it('checks snack is set to true ', function() {
      expect(Component.getState()[1].show).toBe(true);
    });

    it('test document listener is on search', function(done) {
      expect(docs.view).toBe('search not found');
      done();
    });


    })

})();