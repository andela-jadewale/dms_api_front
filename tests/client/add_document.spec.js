(function() {
  var React = require('react'),
    enzyme = require('enzyme'),
    expect = require('chai').expect,
    shallow = require('enzyme').shallow,
    mount = require('enzyme').mount,
    AddDocs = require('../../app/components/AddDocuments.jsx'),
    Button = require('../../app/components/Buttons.jsx'),
    SelectField = require('../../app/components/SelectFields.jsx'),
    Input = require('../../app/components/TextFields.jsx'),
    SnackBar = require('../../app/components/SnackBar.jsx');


  describe('Add documents', function () {
    var addDocs = shallow(<AddDocs />),
      input = addDocs.find(Input),
      selectField = addDocs.find(SelectField),
      snackBar = addDocs.find(SnackBar);

    it('should have an input type for title', function () {
      expect(input).to.have.length.of(1);
      expect(input.nodes[0].props.hint).to.equal('Enter Title');
    })

    it('should have a selectfield for role', function () {
      expect(selectField).to.have.length.of(1);
    })

    it('should have error and success display message', function () {
      expect(snackBar).to.have.length.of(2);
    })

    addDocs = shallow(<AddDocs owner='true' update='true' />);
    input = addDocs.find(Input),
    selectField = addDocs.find(SelectField),

    it('should have an input type for title', function () {
      expect(input).to.have.length.of(1);
      expect(input.nodes[0].props.hint).to.equal('Enter Title');
    })

    it('should have a selectfield for role', function () {
      expect(selectField).to.have.length.of(1);
    })

  });
})();