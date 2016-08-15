
  var FakeComponent = function () {
    'use strict';
     var states = [];

    var setState = function(obj) {
      states.push(obj);
    };

    var getState = function() {
      return states;
    };

    return {
      setState: setState,
      getState: getState
    };

  };

  module.exports = new FakeComponent();