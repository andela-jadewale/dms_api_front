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


  describe('Add documents', function () {
    var addDocs = mount(<MuiThemeProvider><AddDocs/></MuiThemeProvider>),
      input = addDocs.find(Input),
      selectField = addDocs.find(SelectField),
      count = 0;
      snackBar = addDocs.find(SnackBar);

      DocStore.onChange(function (docs) {
      })

    it('should have an input type for title', function () {
      expect(input).to.have.length.of(2);
      expect(input.nodes[0].props.hint).to.equal('Enter Title');
    })

    it('should have a selectfield for role', function () {
      expect(selectField).to.have.length.of(0);
    })

    it('should have error and success display message', function () {
      expect(snackBar).to.have.length.of(2);
    })

    it('should check document creator is active', function () {
      DocStore.onChange(function (docs) {
        expect(docs.view).to.equal('Add docs');
      })
    })

    addDocs = mount(<MuiThemeProvider><AddDocs owner='true' update='true' /></MuiThemeProvider>);
    input = addDocs.find(Input),
    selectField = addDocs.find(SelectField);

    it('should have an input type for title', function () {
      expect(input).to.have.length.of(2);
      expect(input.nodes[0].props.hint).to.equal('Enter Title');
    })


  });
})();


