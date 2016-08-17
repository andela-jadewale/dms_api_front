var React = require('react');
var Buttons = require('./Buttons.jsx');
var InputForm = require('./TextFields.jsx');
var action = require('../actions/DocManagementActionCreator.jsx');
var UserAction = require('../actions/User.jsx');
var UserHelper = require('../services/Users.js');
var UserStore = require('../stores/User.jsx');
var LinearProgress = require('material-ui/LinearProgress').default;
var CircularProgress = require('material-ui/CircularProgress').default;
var SnackBar = require('./SnackBar.jsx');
var params = {};
var url = '/api/v1/users/login';
var Link = require('react-router').Link;

function username(e) {
  params.username = e.target.value;
}

function password(e) {
  params.password = e.target.value;
}

function submit (e) {
  e.preventDefault();
  UserStore.getSelf().setState({load: true});
  UserAction.emitAction(params, 'LogIn');
}

function logIn(e) {
  action.logIn();
}

function signUp(e) {
  //action.signUpView('SignUpView');
}

module.exports = React.createClass({
  getInitialState : function () {
    UserStore.setSelf(this);
    return {load: false, open: false, errors: false}
  },
  errors: function () {
    this.setState({load: false});
    this.setState({errors:true});
  },
  render: function () {
    return (
        <div className='signin-header home'>
        <div className='log-div'> </div>
        <form onSubmit={submit} className='form-horizontal'>
          <div className='form-group'> <InputForm type='text' change={username} required='true' fullWidth='true' hintText='Username' float='Username'/> </div>
          <div className='form-group'> <InputForm type='password' change={password} required='true' fullWidth='true' hintText='Password' float='Password'/> </div>
          <div className='form-group'> <Buttons type='Submit' className='fullWidth' bg='#4285f4' width='true' label='Log In'/> </div>
        <div className='clear'> </div>
        {
          this.state.load ?
         <LinearProgress  mode='indeterminate' />
          :  <div> </div>
        }
        <SnackBar open={this.state.open} message='Success'/>
        <SnackBar open={this.state.errors} message='Invalid Username or password'/>
        <div className='form-group'>
           <span className='black-color'> Dont have an account ? <Link to='signup'>Sign Up</Link> </span>
          </div>

        </form>
        <div className='log-div'> </div>
         <div className='clear'> </div>

        </div>

    )
  }
})