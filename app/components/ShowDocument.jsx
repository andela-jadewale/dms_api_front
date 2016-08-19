var React = require('react');
var Dialog = require('./Dialog.jsx');
var AddDocuments = require('./AddDocuments.jsx');

module.exports = React.createClass({
  save: function () {

  },
  cancel: function () {

  },
  getInitialState: function () {
    return {open: true}
  },
  render: function () {
    return (
      <Dialog
        display={<AddDocuments update='true' id={this.props.id} />}
        save={this.save}
        cancel={this.cancel} open={this.state.open}
      />

      )
  }
})