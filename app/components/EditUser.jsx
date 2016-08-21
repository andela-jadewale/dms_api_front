var React = require('react');
var Buttons = require('./Buttons.jsx');
var InputForm = require('./TextFields.jsx');
var Login = require('./LogIn.jsx');
var SelectField = require('./SelectFields.jsx');
var UserHelper = require('../services/Users.js');
var action = require('../actions/DocManagementActionCreator.jsx');
var SnackBar = require('./SnackBar.jsx');
var UserStore = require('../stores/User.jsx');
var Names = {};
var url = '/api/v1/users/';

module.exports = React.createClass({
  getInitialState: function (e) {
    UserStore.setData(Names);
    if(!this.props.data) {
      return {lastName: '', firstName: '', email: '',
        username: '', role: '' }
    }
    else {
      return {lastName: this.props.data.name.last, firstName: this.props.data.name.first
      ,email: this.props.data.email, username: this.props.data.username,
       role: this.props.data.role }
    }
  },
  firstName: function (e) {
   Names.firstName = e.target.value;
   this.setState({firstName: Names.firstName})
    },
  lastName: function (e) {
   Names.lastName = e.target.value;
   this.setState({lastName: Names.lastName})
    },
      render: function () {
    return (
      <div>
      <form>
          <div className='form-group'> <InputForm type='text' value={this.state.lastName}  change={this.lastName}   fullWidth='true' hint={this.state.lastName} float='Last Name'/> </div>
          <div className='form-group'> <InputForm type='text' value={this.state.firstName}  change={this.firstName}  fullWidth='true' hint={this.state.firstName} float='First Name'/> </div>
          <div className='form-group'> <InputForm type='email' value={this.state.email} disable='true' required='true' fullWidth='true' hintText='Email' float='Email'/> </div>
          <div className='form-group'> <InputForm type='text' value={this.state.username} disable='true' required='true' fullWidth='true' hintText='Username' float='Username'/> </div>
          <div className='form-group'> <InputForm type='text' value={this.state.role} disable='true' required='true' fullWidth='true' hintText='Role' float='Role'/> </div>
          <div className='form-group'>
          </div>
          <div className='clear'> </div>
          <SnackBar open={false} message='User Account Updated'/>
        </form>
      </div>
    )
  }
});