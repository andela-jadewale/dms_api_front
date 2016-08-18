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

function accessRole(e) {
  DocumentData.role = [e];
}

function handleEditorChange(e) {
  if(DocStore.getSelf().state.owner) {
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
   /* if(!EnvironmentDetect() || window.localStorage ){
      DocStore.setTinyMce(tinyMCE);
    } */

    if(window.localStorage) {
      DocStore.setTinyMce(tinyMCE);
    }
    DocAction.emitAction(null, 'Init');
    DocStore.setData(DocumentData);

    console.log(this.props.id, 'is what');

    if ((this.props.owner) === false ) {
      return {roles: [{title: 'test'}], open: false, title: '',
      documentText: '', owner: false,  access: null };
    }

    return {roles: [{title: 'test'}], open: false, title: '', documentText: '',
    owner: true, access : null, snack : false, snackError: false };
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
          <TinyMCE id='text' content={this.state.documentText}
            config={{
              plugins: 'link image code textcolor advlist',
              toolbar: 'forecolor backcolor | undo redo | bold italic | alignleft aligncenter alignright | code',
              advlist_number_styles: 'lower-alpha',
              advlist_bullet_styles: 'square"'
            }}
            onChange={handleEditorChange}
            />

          </div>
          :
          <div>
          <InputForm change={titleText} value={this.state.title} float='Add Title' fullWidth='true' required='true' hint='Enter Title' />
          <div>

          <InputForm change={titleText} value='' float='Access' fullWidth='true' required='true' hint='No Access to edit or delete Document' />
          </div>

          <TinyMCE id='text' content={this.state.documentText}
            config={{
              plugins: 'link image code textcolor advlist',
              toolbar: 'forecolor backcolor | undo redo | bold italic | alignleft aligncenter alignright | code',
              advlist_number_styles: 'lower-alpha',
              advlist_bullet_styles: 'square"',
              readonly : 1
            }}
            />
          </div>
      }
      </form>
      <div>
      <SnackBar open={this.state.snack} message='Document Saved Successfully'/>
      </div>
      <div>
      <SnackBar open={this.state.snackError} message='Error saving document. Use a uniqute title with content.'/>
      </div>
      </div>
    )
  }
})
