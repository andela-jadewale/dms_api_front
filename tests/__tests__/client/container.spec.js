global.window.localStorage = {'getItem': function () {
  'use strict';
  return null;
}};
global.window.test = true;

(function() {
  jest.dontMock('../../../app/stores/User.jsx');
  jest.dontMock('../../../app/dispatcher/dispatcher.js');
  jest.dontMock('../../../app/services/xhrRequest.js');
  jest.dontMock('../../../app/components/Container.jsx');
  var React = require('react'),
    enzyme = require('enzyme'),
    expect = require('chai').expect,
    shallow = require('enzyme').shallow,
    mount = require('enzyme').mount,
    Container = require('../../../app/components/Container.jsx'),
    SignUp = require('../../../app/components/SignUp.jsx');


  describe('Container', function () {
    var container = mount(<Container />),
      signUp = container.find(SignUp),
      component;

    it('should have sign up body', function () {
      expect(signUp).to.have.length.of(1);
    })

  });

})();