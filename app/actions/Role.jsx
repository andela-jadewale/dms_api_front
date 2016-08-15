var dispatcher = require('../dispatcher/dispatcher.js');

module.exports = {
  emitAction: function(data) {
    dispatcher.dispatch({
      payload: data,
      type: 'Role:' + data.type
    })
  }
}