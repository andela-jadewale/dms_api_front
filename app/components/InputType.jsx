var React = require('react');
var TextField = require('material-ui/TextField').default;

module.exports = React.createClass({
  getInitialState: function () {
    return {input:''};
  },
  username: function (e) {
    this.setState({input: e.target.value});
    this.props.getValue(e.target.value)
  },

  render: function () {
    return (
      <div className='form-horizontal'>
        <div className='form-group'>
          <TextField value={this.state.input} onChange={this.username} type='text' hintText='Username' floatingLabelText='Username'/>
        </div>
        <div className='form-group'>
          <TextField type='email' hintText='Email' floatingLabelText='Email'/>
        </div>
        <div className='form-group'>
          <TextField type='password' hintText='Password' floatingLabelText='Password'/>
        </div>
      </div>

    )
  }
})