(function() {
  var React = require('react'),
    enzyme = require('enzyme'),
    expect = require('chai').expect,
    shallow = require('enzyme').shallow,
    mount = require('enzyme').mount,
    Container = require('../../app/components/Container.jsx'),
    SignUp = require('../../app/components/SignUp.jsx');


  describe('Container', function () {
    var container = shallow(<Container />),
      signUp = container.find(SignUp);

    it('should have sign up body', function () {
      expect(signUp).to.have.length.of(1);
    })

  });

})();