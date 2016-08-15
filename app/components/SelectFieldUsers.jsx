var React = require('react');
var SelectField = require('material-ui/SelectField').default;
var MenuItem = require('material-ui/MenuItem').default;

module.exports = React.createClass({
  getInitialState: function (e) {
    return {select:null}
  },
  handleChange: function (e, value, index) {
    this.setState({select: value + 1})
    this.props.getValue(value);
  },
  render: function () {
    return (
        <SelectField floatingLabelText='Select Access' value={this.state.select} onChange={this.handleChange}>
          <MenuItem value={1} primaryText='My Documents' />
          <MenuItem value={2} primaryText='Other Documents' />
          <MenuItem value={3} primaryText='All documents' />
        </SelectField>
    )
  }
})