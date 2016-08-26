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

function access(e) {
  UserData.role = e;
}

function submit(e) {
  e.preventDefault();
  UserAction.emitAction(UserData, 'SignUp');
}

module.exports = React.createClass({
  componentDidMount: function() {
    return {roles: []}
  },
  componentWillUnmount: function() {

  },
  getInitialState: function () {
    UserStore.setSelf(this);
    UserStore.getRoles();
    return {roles: [{title: ''}], open: false, texts: '', errors: false, user: '',
      last: '', first: '', email: '', pass: '', repass: ''};
  },
  userName: function (e) {
     UserData.username = e.target.value;
     this.setState({user: e.target.value});
  },
  lastName: function(e) {
     UserData.lastName = e.target.value;
     this.setState({last: e.target.value});
  },
  firstName: function(e) {
    UserData.firstName = e.target.value;
    this.setState({first: e.target.value});
  },
  email: function (e) {
    UserData.email = e.target.value;
    this.setState({email: e.target.value});
  },
  password: function (e) {
     UserData.password = e.target.value;
     this.setState({pass: e.target.value});
  },
  rePassword: function (e) {
    UserData.rePassword = e.target.value;
    this.setState({repass: e.target.value});
  },
  render: function () {
    return (
        <div className='signin-header full-height home home-image'>
        <div className='log-div'> </div>
        <div className='img-bg'>

         </div>
        <form onSubmit={submit} className='form-horizontal'>
          <div className='for-class'><InputForm type='text' default='true' className='float-left text-width' change={this.userName} value={this.state.user} required='true'   hintText='Username' float='Username'/>
           <InputForm type='email' value={this.state.email} default='true' change={this.email} required='true'  hintText='Email' float='Email'/>
           </div>
          <div className=''> </div>
          <div className='for-class'> <InputForm type='text' default='true' value={this.state.first} change={this.firstName} required='true'  hintText='First Name' float='First Name'/>
            <InputForm type='text' value={this.state.last} default='true' change={this.lastName} required='true'  hintText='Last Name' float='Last Name'/>

           </div>

          <div className='for-class'> <InputForm type='password' default='true' value={this.state.pass} change={this.password} required='true'  hintText='Password' float='Password'/>
            <InputForm type='password' value={this.state.repass} default='true' change={this.rePassword} required='true'  hintText='Re enter Password' float='Re enter Password'/>
           </div>

          <div className='for-class'> <SelectField getValue={access}  fullWidth='true' roles={this.state.roles} /> </div>
          <div className='clear'> </div>
          <div className='for-class'> <Buttons className='fullWidth' type='Submit' bg='#4285f4' width='true' label='Sign Up'> </Buttons> </div>

          <SnackBar open={this.state.open} message='User Account created'/>
           <SnackBar open={this.state.errors} message={this.state.texts}/>
        <div className='clear'> </div>
         <div className='for-class'>
           <span className='black-color'> Already have an account ? <Link to='/'>Log In</Link></span>
          </div>
        </form>
        </div>


    )
  }
})