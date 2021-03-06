global.window.localStorage = {'getItem': function () {
  'use strict';
  return null;
}, 'setItem': function () {
  return null;
}};

global.window.tinyMCE = {'get': function() {
  return {
    'setContent': function() {
      return null;
    }
  }
}};

global.window.tinymce = {'init': function() {
  return {
    'setContent': function() {
      return null;
    }
  }
}};

global.window.test = true;

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
  var docs = {};
  var addDocument;
  var title = 'hello world is new';
  var React = require('react'),
    enzyme = require('enzyme'),
    shallow = require('enzyme').shallow,
    mount = require('enzyme').mount,
    AddDocs = require('../../../app/components/AddDocuments.jsx'),
    Button = require('../../../app/components/Buttons.jsx'),
    SelectField = require('../../../app/components/SelectFields.jsx'),
    Input = require('../../../app/components/TextFields.jsx'),
    SnackBar = require('../../../app/components/SnackBar.jsx');

    describe('Search Document', function () {
    DocStore = require('../../../app/stores/Document.jsx');
    FakeComponent = require('../../FakeComponent.js');
    DocAction = require('../../../app/actions/DocManagementActionCreator.jsx');
    DocAction.emitAction(FakeComponent, 'Search');
    it('shows no search was displayed', function() {
      expect(FakeComponent.getState()[0].show).toBe(false);
    });

    })

    describe('Add Document dialog opens', function () {
    DocAction.emitAction(FakeComponent, 'Add');
    it('shows no search was displayed', function() {
      expect(FakeComponent.getState()[3].open).toBe(true);
    });

    })

    describe('Show document', function () {
    DocStore.setDocComp(FakeComponent);
    DocAction.emitAction('Ade', 'Show');

    it('shows no search was displayed', function() {
      expect(FakeComponent.getState()[3].open).toBe(true);
    });

    it('shows id was set', function() {
      expect(FakeComponent.getState()[4].id).toBe('Ade');
    });

    it('shows dialog is open', function() {
      expect(FakeComponent.getState()[5].open).toBe(true);
    });

    })

    describe('Show document with owner right', function () {
    DocStore.setDocComp(FakeComponent);
    DocAction.emitAction('Ade', 'Show');

    it('shows no search was displayed', function() {
      expect(FakeComponent.getState()[3].open).toBe(true);
    });

    it('shows id was set', function() {
      expect(FakeComponent.getState()[4].id).toBe('Ade');
    });

    it('shows dialog is open', function() {
      expect(FakeComponent.getState()[5].open).toBe(true);
    });

    it('shows owner rights', function() {
      expect(FakeComponent.getState()[6].owner).toBe(true);
    });
    })

    describe('Show document without owner right', function () {
    DocStore.setDocComp(FakeComponent);
    DocAction.emitAction('Adewale', 'Hide');
    it('shows id has been set ', function() {
      expect(FakeComponent.getState()[10].id).toBe('Adewale');
    });
    })

    describe('delete document dialog', function () {
    DocStore.setDocComp(FakeComponent);
    DocAction.emitAction('1234', 'Delete');
    it('shows delete dialog ', function() {
      expect(FakeComponent.getState()[13].delBox).toBe(true);
    });

    it('shows document text', function() {
      expect(FakeComponent.getState()[14].deleteTitle).toBe('Save changes to delete document 1234');
    });

     it('shows no error with snack bar', function() {
      expect(FakeComponent.getState()[12].snack).toBe(false);
    });
    })

    describe('no Access to delete docs', function () {
    DocStore.setDocComp(FakeComponent);
    DocAction.emitAction('1234', 'DeleteError');
    it('shows no access rights snack bar ', function() {
      expect(FakeComponent.getState()[15].snack).toBe(true);
    });
    })

    describe('show close dialog', function () {
    DocStore.setDocComp(FakeComponent);
    DocAction.emitAction(FakeComponent, 'Cancel');
    it('shows dialog is closed', function() {
      expect(FakeComponent.getState()[16].open).toBe(false);
    });
    })

    describe('hides dialog when delete is canceled', function () {
    DocStore.setDocComp(FakeComponent);
    DocAction.emitAction(FakeComponent, 'CancelDelete');
    it('delete box is closed ', function() {
      expect(FakeComponent.getState()[17].delBox).toBe(false);
    });
    })

    describe('uses autocomplete with enter', function () {
    DocStore.setDocComp(FakeComponent);
    DocAction.emitAction(FakeComponent, 'CancelDelete');
    it('delete box is closed ', function() {
      expect(FakeComponent.getState()[17].delBox).toBe(false);
    });
    })

    describe('use autocomplete bar', function () {
    DocStore.setDocComp(FakeComponent);
    DocAction.emitAction({'value': FakeComponent, 'data':FakeComponent }, 'Find');
    it('find dialogue is open', function() {
      expect(FakeComponent.getState()[20].show).toBe(true);
    });

    })

    describe('get documents', function () {
    DocStore.setDocComp(FakeComponent);
    DocAction.emitAction('null', 'Get');
    it('doc dialog box shows', function() {
      expect(FakeComponent.getState()[20].show).toBe(true);
    });

    });

    describe('confirm delete', function () {
    DocStore.setSelf(FakeComponent);
    DocAction.emitAction({'id': '234', 'self': FakeComponent}, 'Confirm');
    it('delete  dialog box is hidden after delete has been confirmed', function() {
      expect(FakeComponent.getState()[22].delBox).toBe(false);
    });

    });

})();

