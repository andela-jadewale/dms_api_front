var React = require('react');
var FontIcon = require('material-ui/FontIcon').default;
var Buttons = require('./Buttons.jsx');
var InputForm = require('./TextFields.jsx');
var Login = require('./LogIn.jsx');
var SelectField = require('./SelectFields.jsx');
var UserHelper = require('../services/Users.js');
var UserStore = require('../stores/User.jsx');
var action = require('../actions/DocManagementActionCreator.jsx');
var UserAction = require('../actions/User.jsx');
var SnackBar = require('./SnackBar.jsx');
var UserData = {};
var url = '/api/v1/roles/';
var signUpUrl = '/api/v1/users/';
var Link = require('react-router').Link

function userName(e) {
  UserData.username = e.target.value;
}

function lastName(e) {
  UserData.lastName = e.target.value;
}

function firstName(e) {
  UserData.firstName = e.target.value;
}

function email(e) {
  UserData.email = e.target.value;
}
function password(e) {
  UserData.password = e.target.value;
}

function rePassword(e) {
  UserData.rePassword = e.target.value;
}

function access(e) {
  UserData.role = e;
}

function submit(e) {
  e.preventDefault();
  UserAction.emitAction(UserData, 'SignUp');
}

module.exports = React.createClass({
  getInitialState: function () {
    UserStore.setSelf(this);
    UserStore.getRoles();
    return {roles: [{title: ''}], open: false, text: '', errors: false};
  },
  render: function () {
    return (
        <div className='signin-header home'>
        <div className='image-div'> </div>
        <form onSubmit={submit} className='form-horizontal'>
          <div className='form-group'>
          <InputForm type='text' className='float-left text-width' change={userName} required='true' fullWidth='true'  hintText='Username' float='Username'/> </div>
          <div className='form-group'> <InputForm type='text' change={lastName} required='true' fullWidth='true' hintText='Last Name' float='Last Name'/> </div>
          <div className='form-group'> <InputForm type='text' change={firstName} required='true' fullWidth='true' hintText='First Name' float='First Name'/> </div>
          <div className='form-group'> <InputForm type='email' change={email} required='true' fullWidth='true' hintText='Email' float='Email'/> </div>
          <div className='form-group'> <InputForm type='password' change={password} required='true' fullWidth='true' hintText='Password' float='Password'/> </div>
          <div className='form-group'> <InputForm type='password' change={rePassword} required='true' fullWidth='true' hintText='Re enter Password' float='Re enter Password'/> </div>
          <div className='custom'> <SelectField getValue={access} fullWidth='true' roles={this.state.roles} /> </div>
          <div className='clear'> </div>
          <div className='form-group'> <Buttons className='fullWidth' type='Submit' bg='#4285f4' width='true' label='Sign Up'> </Buttons> </div>

          <SnackBar open={this.state.open} message='User Account created'/>
           <SnackBar open={this.state.errors} message={this.state.text}/>
        <div className='clear'> </div>
         <div className='form-group'>
           <span className='black-color'> Already have an account ? <Link to='/'>Log In</Link></span>
          </div>
        </form>
        </div>


    )
  }
})