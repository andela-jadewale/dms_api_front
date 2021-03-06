var React = require('react');
var InputForm = require('./TextFields.jsx');
var SelectField = require('./SelectFields.jsx');
var Buttons = require('./Buttons.jsx');
var roles = [{role: 'Admin'}, {role: 'Guest'}, {role: 'User', }];
var SnackBar = require('./SnackBar.jsx');
var UserHelper = require('../services/Users.js');
var url = '/api/v1/roles/';
var docUrl = '/api/v1/documents';
var DocumentData = {};
var TinyMCE = require('react-tinymce');
var DocStore = require('../stores/Document.jsx');
var DocAction = require('../actions/DocManagementActionCreator.jsx');
var EnvironmentDetect = require('../services/Environment.js');
var title = '';

function accessRole(e) {
  DocumentData.role = [e];
}

function handleEditorChange(e) {
  if(DocStore.getSelf().state.owner || DocStore.getSelf().state.rights) {
    DocumentData.content = e.target.getContent();
    DocStore.getSelf().setState({documentText: e.target.getContent()});
  }
}

function changeDoc(e) {
  e.stopPropagation();
}

function titleText(e) {
  e.stopPropagation();
  if(DocStore.getSelf().state.owner) {
    DocumentData.title = e.target.value;
    DocStore.getSelf().setState({title: e.target.value});
  }
}
module.exports = React.createClass({

  getInitialState: function() {
    DocStore.setSelf(this);
    DocStore.setTinyMce(tinyMCE);
    DocAction.emitAction(null, 'Init');
    DocStore.setData(DocumentData);

    if ((this.props.owner) === false ) {
      return {roles: [{title: 'test'}], open: false, title: '',
      documentText: '', owner: false,  access: null ,
      rights: false, snack : false, snackError: false,};
    }
    if((this.props.owner) === 'owner' || true) {
      return {roles: [{title: 'test'}], open: false, title: '', documentText: '',
     access : null, owner: true, snack : false, snackError: false, rights: false };
    }

    return {roles: [{title: 'test'}], open: false, title: '', documentText: '',
     access : null, snack : false, snackError: false, rights: false };
  },
  render: function () {
    return (
      <div>
      <form>
      {
        this.state.owner ?
          <div>
          <InputForm change={titleText} value={this.state.title} float='Add Title' fullWidth='true' required='true' hint='Enter Title' />
          {
            this.props.update ?
              <SelectField value={this.state.access}  getValue={accessRole} roles={this.state.roles} />
            :
              <SelectField getValue={accessRole} roles={this.state.roles} />
          }
          </div>
          :
          <div>
          { this.state.rights ?
              <div>
              <InputForm  value={this.state.title} float='Add Title' fullWidth='true' required='true' hint='Enter Title' />
              <InputForm  value='No rights to set access or title , please edit document only.' float='Access' fullWidth='true' required='true'  />
              </div>
            :
              <div>
              <InputForm  value={this.state.title} float='Add Title' fullWidth='true' required='true' hint='Enter Title' />
              <InputForm  value='No rights to edit document' float='Access' fullWidth='true' required='true'  />
              </div>
          }
            </div>

      }
          <TinyMCE id='text' content={this.state.documentText}
            config={this.state.config}
            onChange={handleEditorChange}
          />

      </form>
      <div>
      <SnackBar open={this.state.snack} message='Document Saved Successfully'/>
      </div>
      <div>
      <SnackBar open={this.state.snackError} message='Error saving document. Use a unique title with content.'/>
      </div>
      </div>
    )
  }
})
