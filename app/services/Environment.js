var environment = function () {
  'use strict';
  var isNode=new Function('try {return this===global;}catch(e){return false;}');
  if(isNode()){
    return true;
  }

  return false;
};

module.exports = environment;