var dispatcher = require('../dispatcher/dispatcher.js');

function SignUp () {

  var action = '';
  var listeners = [];

  function getItems() {
    return action;
  }

  function onChange(listener) {
    listeners.push(listener);
  }

  function triggerListeners() {
    listeners.forEach(function(listener) {
      listener(action)
    })

  }

  function signUp(data) {
    action = data;
    triggerListeners();
  }

  function documents(data) {
    action = {'data': data, 'view': 'documents'};
    triggerListeners();
  }

  function documentShow(data) {
    action = {'data': data, 'show': 'documents'};
    triggerListeners();
  }

   function signUpView(data) {
    action = data;
    triggerListeners();
  }

  function logInView(data) {
    action = data;
    triggerListeners();
  }

  dispatcher.register(function (e) {
    var split = e.type.split(':');
    if(split[0] === 'docMan') {
      switch(split[1]) {
        case 'SignUp': signUp(e.payload);
        break;
        case 'Documents': documents(e.payload);
        break;
        case 'View': documentShow(e.payload);
        break;
        case 'SignUpView': signUpView(e.payload);
        break;
        case 'LogInView': logInView(e.payload);
      }
    }
  })

  return {
    getItems: getItems,
    onChange: onChange
  }

}

module.exports = new SignUp();