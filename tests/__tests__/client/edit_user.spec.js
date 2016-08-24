(function() {
  var React = require('react'),
    enzyme = require('enzyme'),
    expect = require('chai').expect,
    shallow = require('enzyme').shallow,
    mount = require('enzyme').mount,
    EditUser = require('../../../app/components/EditUser.jsx'),
    Input = require('../../../app/components/TextFields.jsx'),
    SnackBar = require('../../../app/components/SnackBar.jsx');


  describe('Edit User', function () {
    var name = {
      last: 'Adewale',
      first: 'Jolaade',
      'email': 'Jbadewale',
      'username': 'Joli',
      'role': 'Administrator'
    }

    var editUser = shallow(<EditUser/>);
      editUser.setState({ data: name });
       editUser.setProps({ data: name });

    var input = editUser.find(Input),
      snackBar = editUser.find(SnackBar);

    it('should have input ', function () {
      expect(input).to.have.length.of(5);
    })
    /*
    it('should test input label', function () {
      expect(input.nodes[0].props.float).to.equal('Last Name');
      expect(input.nodes[1].props.float).to.equal('First Name');
      expect(input.nodes[2].props.float).to.equal('Email');
      expect(input.nodes[3].props.float).to.equal('Username');
      expect(input.nodes[4].props.float).to.equal('Role');
    })

    it('should have a snack bar', function () {
      expect(snackBar).to.have.length.of(1);
    })

    it('should have a snack bar message', function () {
      expect(snackBar.nodes[0].props.message).to.equal('User Account Updated');
    })
  */
  });

})();