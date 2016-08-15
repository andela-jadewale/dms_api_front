(function () {

  var React = require('react'),
    enzyme = require('enzyme'),
    expect = require('chai').expect,
    shallow = require('enzyme').shallow,
    mount = require('enzyme').mount,
    SignUp = require('../../app/components/SignUp.jsx'),
    Button = require('../../app/components/Buttons.jsx'),
    Input = require('../../app/components/TextFields.jsx'),
    SnackBar = require('../../app/components/SnackBar.jsx'),
    SelectField = require('../../app/components/SelectFields.jsx'),
    localStorage = '';

  describe('SignUp', function () {
    var signUp = shallow(<SignUp />),
      button = signUp.find(Button),
      snackBar = signUp.find(SnackBar),
      selectField = signUp.find(SelectField),
      input = signUp.find(Input);

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

  })

})();