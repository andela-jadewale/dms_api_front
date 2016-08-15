(function () {

  var React = require('react'),
    enzyme = require('enzyme'),
    expect = require('chai').expect,
    shallow = require('enzyme').shallow,
    mount = require('enzyme').mount,
    LogIn = require('../../app/components/LogIn.jsx'),
    Button = require('../../app/components/Buttons.jsx'),
    Input = require('../../app/components/TextFields.jsx'),
    SnackBar = require('../../app/components/SnackBar.jsx'),
    localStorage = '';

  describe('Log In', function () {
    var logIn = shallow(<LogIn />),
      button = logIn.find(Button),
      snackBar = logIn.find(SnackBar),
      input = logIn.find(Input);

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

    it('should test the second snack bar', function () {
       expect(snackBar.nodes[1].props.message).to.equal('Invalid Username or password');
    })

    it('should test the snack bar is hidden', function () {
       expect(snackBar.nodes[0].props.open).to.equal(false);
    })

  })

})();