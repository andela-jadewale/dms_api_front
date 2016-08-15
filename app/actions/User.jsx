var dispatcher = require('../dispatcher/dispatcher.js');

module.exports = {
  emitAction: function(data, type) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:' + type
    })
  }
}