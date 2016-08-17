var dispatcher = require('../dispatcher/dispatcher.js');

module.exports = {
  emitAction: function (data, type) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:'+ type
    })
  },
  signUpView: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:SignUpView'
    })
  },
  confirmDelete: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:Confirm'
    })
  },
  cancelDelete: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:CancelDelete'
    })
  },
  getDocument: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:Get'
    })
  },
  addDocuments: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:Add'
    })
  },
  viewDocuments: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:View'
    })
  },
  showEditDocuments: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:Show'
    })
  },
  showUnEditDocuments: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:Hide'
    })
  },
  updateDocuments: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:UpdateDoc'
    })
  },
  deleteDocuments: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:Delete'
    })
  },
  deleteError: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:DeleteError'
    })
  },
  search: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:Search'
    })
  },
  save: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:Save'
    })
  },
  cancel: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:Cancel'
    })
  },
  find: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:Find'
    })
  }
}
