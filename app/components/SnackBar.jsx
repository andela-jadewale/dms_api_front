var React = require('react');
var SnackBar = require('material-ui/Snackbar').default;

module.exports = React.createClass({
  render: function () {
    return (
        <SnackBar open={this.props.open} message={this.props.message} autoHideDuration={4000}  />
      )
  }
});