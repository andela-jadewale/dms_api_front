'use strict';

var valid = true;

module.exports =  {
  logUserIn : function (params) {
    if((!params.username) || ((!params.password))) {
      valid = false;
    }

    return valid;
  },

  signUp : function (params) {
    if(!params.username) {
      valid = false;
    }
    if(!params.lastName) {
      valid = false;
    }
    if(!params.firstName) {
      valid = false;
    }
    if((!params.email)) {
      valid = false;
    }

    if(!params.password) {
      valid = false;
    }

    if(!params.role) {
      valid = false;
    }

    return valid;
  }

};

function validEmail(data) {
  return true;
}

