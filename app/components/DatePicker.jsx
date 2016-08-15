var React = require('react');
var DatePicker = require('material-ui/DatePicker').default;

module.exports = React.createClass({
  render: function () {
    return (
      <DatePicker onChange={this.props.change} floatingLabelText={this.props.texts} hintText={this.props.hint}
      container={this.props.container} mode={this.props.land} />
      )
  }
});

