'use strict';
var Errors = require('./Error.js');

module.exports =  {

  logUserIn : function (params) {
    var valid = true;

    if((!params.username) || ((!params.password))) {
      valid = false;
    }

    return valid;
  },

  signUp : function (params) {
    var valid = true;

    if(!validData(params.username)) {
      Errors.setData('Username cannot contain non words or numbers');
      valid = false;
    }

    if(!validData(params.lastName)) {
      Errors.setData('Last Name cannot contain non words or numbers');
      valid = false;
    }

    if(!validData(params.firstName)) {
      Errors.setData('First Name cannot contain non words or numbers');
      valid = false;
    }

    if((!params.email)) {
      valid = false;
    }

    if(!params.password) {
      valid = false;
    }

    if(params.password !== params.rePassword) {
      Errors.setData('Password mismatch');
      valid = false;
    }

    if(!params.role) {
      Errors.setData('Please select a role');
      valid = false;
    }

    return valid;
  }

};

function validData(data){
  return (data)? (/([\d+\W+])+/gi.test(data)) ? false: true : false;
}

function validEmail(data) {
  return true;
}

