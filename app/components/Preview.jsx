var React = require('react');
var InputForm = require('./TextFields.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return {value: this.props.data.content, title: this.props.data.title, access: this.props.data.access[0]}
  },
  render: function () {
    return (
      <div>
      <InputForm  value={this.state.title} float='Add Title' fullWidth='true' required='true' hint='Enter Title' />
      <InputForm  value={this.state.access} float='Access' fullWidth='true' required='true' />
      <InputForm  textArea='true' row={5} value={this.state.value}  />
      </div>
      )
  }
})