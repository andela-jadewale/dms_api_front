global.window.localStorage = {'getItem': function () {
  'use strict';
  return null;
}};

global.window.test = true;

(function () {
  jest.dontMock('../../../app/stores/User.jsx');
  jest.dontMock('../../../app/dispatcher/dispatcher.js');
  jest.dontMock('../../../app/services/xhrRequest.js');
  jest.dontMock('../../../app/components/SignUp.jsx');
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
    SignUp = require('../../../app/components/SignUp.jsx'),
    Button = require('../../../app/components/Buttons.jsx'),
    Input = require('../../../app/components/TextFields.jsx'),
    SnackBar = require('../../../app/components/SnackBar.jsx'),
    SelectField = require('../../../app/components/SelectFields.jsx'),
    UserStore = require('../../../app/stores/User.jsx'),
    TestUtils = require('react-addons-test-utils'),
    localStorage = '';

  describe('SignUp', function () {
    var signUp = mount( <MuiThemeProvider><SignUp /></MuiThemeProvider>),
      button = signUp.find(Button),
      snackBar = signUp.find(SnackBar),
      selectField = signUp.find(SelectField),
      input = signUp.find(Input),
      form = signUp.find('form').at(0);


    it('should have input type', function () {
      expect(input).to.have.length.of(6);
    })

    it('should check the placeholders', function () {
       expect(input.nodes[0].props.hintText).to.equal('Username');
       expect(input.nodes[1].props.hintText).to.equal('Last Name');
       expect(input.nodes[2].props.hintText).to.equal('First Name');
       expect(input.nodes[3].props.hintText).to.equal('Email');
       expect(input.nodes[4].props.hintText).to.equal('Password');
       expect(input.nodes[5].props.hintText).to.equal('Re enter Password');
    })

    it('should have a select field', function () {
      expect(selectField).to.have.length.of(1);
    })

    it('should have sign up button', function () {
       expect(button).to.have.length.of(1);
    })

    it('should have sign up text', function () {
       expect(button.props().label).to.equal('Sign Up');
    })

    it('should test success snack bar message', function () {
       expect(snackBar.nodes[0].props.message).to.equal('User Account created');
    })

    it('should test the success snack bar is hidden', function () {
       expect(snackBar.nodes[0].props.open).to.equal(false);
    })

    it('should test error snack bar message', function () {
       expect(snackBar.nodes[1].props.message).to.equal('');
    })

      it('should submit a form ', function () {
      input.nodes[0].props.change({'target': {'value': 'Jolaade'}});
      input.nodes[1].props.change({'target': {'value': 'Adewale'}});
      input.nodes[2].props.change({'target': {'value': 'Babatunde'}});
      input.nodes[3].props.change({'target': {'value': 'jbadewale@yahoo.com'}});
      input.nodes[4].props.change({'target': {'value': 'abcdefgh'}});
      input.nodes[5].props.change({'target': {'value': 'abcdefgh'}});
      selectField.nodes[0].props.getValue('Administrator');
      signUp.find('button').simulate('click');
      form.simulate('submit');
      UserStore.onChange(function (user) {
        expect(user.view).to.equal('user created');
      });
    })

    it('should not submit an incomplete form ', function () {
      input.nodes[0].props.change({'target': {'value': 'Jolaade'}});
      input.nodes[1].props.change({'target': {'value': 'Adewale'}});
      input.nodes[4].props.change({'target': {'value': 'abcdefgh'}});
      input.nodes[5].props.change({'target': {'value': 'abcdefgh'}});
      selectField.nodes[0].props.getValue('Administrator');
      signUp.find('button').simulate('click');
      form.simulate('submit');
      UserStore.onChange(function (user) {
        expect(user.view).to.equal('user not created');
      });
    })


  })

})();


