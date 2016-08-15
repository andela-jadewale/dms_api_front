(function() {
  var React = require('react'),
    enzyme = require('enzyme'),
    expect = require('chai').expect,
    shallow = require('enzyme').shallow,
    mount = require('enzyme').mount,
    ViewDocuments = require('../../app/components/ViewDocuments.jsx'),
    DatePicker = require('../../app/components/DatePicker.jsx'),
    SelectField = require('../../app/components/SelectFieldUsers.jsx'),
    GridList = require('../../app/components/GridList.jsx'),
    Dialog = require('../../app/components/Dialog.jsx');

  describe('View Documents', function () {
    var viewDocs = shallow(<ViewDocuments />),
      datePicker = viewDocs.find(DatePicker),
      selectField = viewDocs.find(SelectField),
      gridList = viewDocs.find(GridList),
      dialog = viewDocs.find(Dialog);

    it('should have date picker ', function () {
      expect(datePicker).to.have.length.of(2);
    })

    it('should have select field ', function () {
      expect(selectField).to.have.length.of(1);
    })

    it('should have grid list', function () {
      expect(gridList).to.have.length.of(1);
    })

    it('should have dialog', function () {
      expect(dialog).to.have.length.of(1);
    })

  });

})();