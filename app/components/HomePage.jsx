var React = require('react');
var Header = require('./Header.jsx');
var Tabs = require('./TabSection.jsx');
var AutoComplete = require('material-ui/AutoComplete').default;
var DataSource = require('../services/DataSource.js');
var Dialog = require('./Dialog.jsx');
var AddDocuments = require('./AddDocuments.jsx');
var DocStore = require('../stores/Document.jsx');
var DocAction = require('../actions/DocManagementActionCreator.jsx');


module.exports = React.createClass({

  getInitialState: function () {
    DocStore.setSelf(this);
    DocStore.setAutoComplete(AutoComplete);

    return {dataSource: [], id: '', open: false, show: false, filter: AutoComplete.caseInsensitiveFilter }
  },
  save: function () {
    DocAction.emitAction(this, 'Save');
  },
  cancel: function () {
    DocAction.emitAction(this, 'Cancel');
  },
  search: function () {
    DocAction.emitAction(this, 'Search');
  },
  find: function (value) {
    DocAction.emitAction({'value': value, 'data': this}, 'Find');
  },
  render: function () {
    return (
      <div>
        <Header data={this.props.data}  />
        <div className='homePageSearch'>
        <div className='setAuto'>
        <AutoComplete animated='true'
        style={{color: '#fff'}}
        filter={this.state.filter}
        maxSearchResults={7}
        floatingLabelStyle={{color: '#fff'}}
        underlineFocusStyle={{borderBottom: 'solid 2px', borderColor: '#4285f4'}}
        onNewRequest={this.find} open={this.state.show} openOnFocus={this.state.show}
        onUpdateInput={this.search}  dataSource={this.state.dataSource}  fullWidth='true' hintText='Search for documents' />
       </div>
       </div>
       <div className='bottomPage'>
       <Tabs data={this.props.data} />
       <Dialog title='Update Document'
        display={<AddDocuments update='true' id={this.state.id} />}
        scroll='true'
        save={this.save}
        cancel={this.cancel} open={this.state.open}
      />
      </div>
      </div>
    )
  }
})