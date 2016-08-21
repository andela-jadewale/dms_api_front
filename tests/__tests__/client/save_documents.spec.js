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

(function() {
  var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
  var React = require('react'),
    enzyme = require('enzyme'),
    expect = require('chai').expect,
    shallow = require('enzyme').shallow,
    mount = require('enzyme').mount,
    AddDocs = require('../../../app/components/AddDocuments.jsx'),
    Button = require('../../../app/components/Buttons.jsx'),
    SelectField = require('../../../app/components/SelectFields.jsx'),
    Input = require('../../../app/components/TextFields.jsx'),
    TestUtils = require('react-addons-test-utils'),
    SnackBar = require('../../../app/components/SnackBar.jsx'),
    DocStore = require('../../../app/stores/Document.jsx'),
    DocAction = require('../../../app/actions/DocManagementActionCreator.jsx'),
    FakeComponent = require('../../FakeComponent.js');

describe('Save documents', function () {
   var addDocs = mount(<MuiThemeProvider><AddDocs/></MuiThemeProvider>),
      input = addDocs.find(Input),
      selectField = addDocs.find(SelectField),
      snackBar = addDocs.find(SnackBar);

      DocStore.onChange(function (docs) {
      })
  it('checks document has been saved', function () {
      DocumentData = {'title': 'title', 'role': 'Administrator',
      'content': 'Hello World'};
      DocStore.setData(DocumentData);
      DocAction.emitAction(FakeComponent, 'Save');
      DocStore.onChange(function (doc) {
        expect(doc.view).to.equal('documents');
      })
    })
});

})();
