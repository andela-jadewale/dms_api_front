global.window.localStorage = {'getItem': function () {
  'use strict';
  return null;
}, 'setItem': function () {
  return null;
}};

global.window.test = true;

(function () {
  jest.dontMock('../../../app/stores/User.jsx');
  jest.dontMock('../../../app/dispatcher/dispatcher.js');
  jest.dontMock('../../../app/services/xhrRequest.js');
  jest.dontMock('../../../app/components/LogIn.jsx');
  jest.dontMock('../../../app/stores/User.jsx');
  /*var request = require("../../xhrMock.js");
  var rewire = require("rewire");
  var myModule = rewire('../../../app/services/xhrrequest.js');
  myModule.__set__("superagent", request); */
  var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
  var React = require('react'),
    enzyme = require('enzyme'),
    expect = require('chai').expect,
    shallow = require('enzyme').shallow,
    mount = require('enzyme').mount,
    LogIn = require('../../../app/components/LogIn.jsx'),
    Button = require('../../../app/components/Buttons.jsx'),
    Input = require('../../../app/components/TextFields.jsx'),
    SnackBar = require('../../../app/components/SnackBar.jsx'),
    SelectField = require('../../../app/components/SelectFields.jsx'),
    UserStore = require('../../../app/stores/User.jsx'),
    TestUtils = require('react-addons-test-utils'),
    localStorage = '';

  describe('LogIn', function () {
    var logIn = mount( <MuiThemeProvider><LogIn/></MuiThemeProvider>),
      button = logIn.find(Button),
      snackBar = logIn.find(SnackBar),
      input = logIn.find(Input),
      form = logIn.find('form').at(0);

    it('should have input type', function () {
      expect(input).to.have.length.of(2);
    })

    it('should check the placeholders', function () {
       expect(input.nodes[0].props.hintText).to.equal('Username');
       expect(input.nodes[1].props.hintText).to.equal('Password');
    })

    it('should have log in button', function () {
       expect(button).to.have.length.of(1);
    })

    it('should have log in text', function () {
       expect(button.props().label).to.equal('Log In');
    })

    it('should test the snack bar length', function () {
       expect(snackBar).to.have.length.of(2);
    })

    it('should test the first snack bar', function () {
       expect(snackBar.nodes[0].props.message).to.equal('Success');
    })
/*
    it('should test the second snack bar', function () {
       expect(snackBar.nodes[1].props.message).to.equal('Invalid Username or password');
    })

    it('should test the snack bar is hidden', function () {
       expect(snackBar.nodes[0].props.open).to.equal(false);
    })

    it('should login a user', function () {
      input.nodes[0].props.change({'target': {'value': 'Jolaade'}});
      input.nodes[1].props.change({'target': {'value': 'Adewale'}});
      form.simulate('submit');
      UserStore.onChange(function (user) {
        expect(user.view).to.equal('documents');
      });
    })


    it('should not login a user in', function () {
      input.nodes[0].props.change({'target': {'value': 'Jolaade'}});
      form.simulate('submit');
      UserStore.onChange(function (user) {
        expect(user.view).to.equal('Authentication Failed');
      });
    })
    */

  })

})();



