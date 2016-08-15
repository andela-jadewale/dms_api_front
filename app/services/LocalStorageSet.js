module.exports = {

  setLogin: function (obj) {
    'use strict';

    saveStorage('token', obj.token);
    saveStorage('id', obj.id);
    saveStorage('username', obj.username);
    saveStorage('role', obj.role);
    saveStorage('email', obj.email);
    saveStorage('first', obj.first);
    saveStorage('last', obj.last);
  }
};


function saveStorage(type, obj) {
  'use strict';
  if(window.localStorage) {
    localStorage.setItem(type, obj);
  }
}