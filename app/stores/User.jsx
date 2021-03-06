var dispatcher = require('../dispatcher/dispatcher.js'),
  loginUrl = '/api/v1/users/login',
  signUpUrl = '/api/v1/users/',
  roleUrl = '/api/v1/roles/',
  UserHelper = require('../services/Users.js'),
  Storage = require('../services/LocalStorageSet.js'),
  self = null,
  userData = {},
  Token = require('../services/Token.js'),
  DataSource = require('../services/DataSource.js'),
  data = '',
  Errors = require('../services/Error.js'),
  userDetail = {},
  browserHistory = require('react-router').browserHistory;

function User() {

  var user = {'data' : '', 'view' : ''},
      listeners = [];

  function getSelf() {
    return self;
  }

  function getRoles() {
    UserHelper.sendRequest(roleUrl, 'GET', null, proccessRoles);
  }

  function setSelf(obj) {
    self = obj;
  }

  function onChange(listener) {
    listeners.push(listener);
  }

  function setData(obj) {
    data = obj;
  }

  function getData() {
    return data;
  }

  function triggerListeners() {
    listeners.forEach(function(listener) {
      listener(user);
    })
  }

  function sendRequest(obj) {
    userDetail = obj.data;
    switch(obj.type) {
      case 'login': UserHelper.logIn(loginUrl, 'POST', obj.data, processLogIn);
      break;
      case 'signUp': UserHelper.signUp(signUpUrl, 'POST', obj.data, proccessSignUp);
    }
  }

  function clearSignUp() {
    getSelf().setState({user: ''});
    getSelf().setState({first: ''});
    getSelf().setState({last: ''});
    getSelf().setState({email: ''});
    getSelf().setState({pass: ''});
    getSelf().setState({repass: ''});
  }

  function proccessSignUp(data) {
    if(data.message === 'user created') {
      getSelf().setState({errors: false});
      getSelf().setState({open: true});
      user.view = 'user created';
      clearSignUp();
      UserHelper.logIn(loginUrl, 'POST', {'username': userDetail.username,
        'password': userDetail.password}, processLogIn)
    }
    else{
      getSelf().setState({errors: true});
      if(typeof data === 'string') {
        getSelf().setState({texts: data});
      }
      else{
        getSelf().setState({texts: 'Username or Email exists'});
      }

      user.view = 'user not created';
    }
    triggerListeners();
  }

  function resetUserData() {
    var names = {'last': localStorage.getItem('last'),
      'first': localStorage.getItem('first')}
    userData.name= names;
    userData.email = localStorage.getItem('email');
    userData.role = localStorage.getItem('role');
    userData.username = localStorage.getItem('username');
  }

  function edit(obj) {
    if(!userData.username) {
      resetUserData();
    }
    obj.self.setState({data: userData});
    obj.self.setState({open: true});
    user.view = 'Edit'
    triggerListeners();
  }

  function proccessRoles(data) {
    getSelf().setState({roles: data.role});
    user.view = 'roles';
    triggerListeners();
  }

  function setUserData(token, id, username, role, email, name) {
    return {
      'token': token,
      'id': id,
      'username': username,
      'role': role,
      'email': email,
      'first': name.first || name,
      'last': name.last || name
    }
  }

  function confirmEdit(obj) {
    UserHelper.sendRequest(signUpUrl + userData.username, 'PUT', getData(), processEdit);
  }

  function processEdit(res) {
    if(res.data) {
       user.view = 'Edit Confirmed';
       DataSource.setUserData(res.data);
       userData = res.data;
       Storage.setLogin(setUserData(Token.getToken(),
        res.data._id, res.data.username,
        res.data.role, res.data.email, res.data.name));
    }
    else{
      user.view = 'Error';
    }

    triggerListeners();
  }

  function processLogIn(res) {
    if(res.token) {
      getSelf().setState({errors: false});
      getSelf().setState({load: false});
      getSelf().setState({open: true});
      userData = res.data;
      DataSource.setUserData(res.data);
      Token.setToken(res.token);
      Storage.setLogin(setUserData(res.token,
        res.data._id, res.data.username,
        res.data.role, res.data.email, res.data.name));
      user.data = userData;
      user.view = 'documents';
    }
    else{
      getSelf().setState({load: false});
      getSelf().setState({errors: true});
      user.view = 'Authentication Failed';
    }
    triggerListeners();
  }

  function logout(obj) {
    browserHistory.push('/signout');
    user.view = 'signOut';
    triggerListeners();
  }

  dispatcher.register(function (e) {
    var split = e.type.split(':');
    if(split[0] === 'docMan') {
      switch(split[1]) {
        case 'SignUp': sendRequest({'data': e.payload, 'type': 'signUp'});
        break;
        case 'LogIn': sendRequest({'data': e.payload, 'type': 'login'});
        break;
        case 'Edit': edit(e.payload);
        break;
        case 'ConfirmEdit': confirmEdit(e.payload);
        break;
        case 'LogOut': logout(e.payload);
        break;
      }
    }
  })

  return {
    setSelf: setSelf,
    onChange: onChange,
    getRoles: getRoles,
    getSelf: getSelf,
    setData: setData,
    getData: getData
  }

}

module.exports = new User();