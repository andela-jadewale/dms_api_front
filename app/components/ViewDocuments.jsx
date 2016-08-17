var React = require('react');
var DatePicker = require('./DatePicker.jsx');
var SelectField = require('./SelectFieldUsers.jsx');
var Documents = require('./GridList.jsx');
var DocStore = require('../stores/Document.jsx');
var DocAction = require('../actions/DocManagementActionCreator.jsx');
var UserHelper = require('../services/Users.js');
var url = '/api/v1/documents/?role=';
var RequestData = {};
var dates = {};
var urlUser = '/api/v1/users/'; //+id+'/documents/';
var urlAll = '/api/v1/documents/';
var urlOthers = '/api/v1/documents/?role=';//+localStorage.getItem('role');
var UserHelper = require('../services/Users.js');
var FloatingActionButton = require('material-ui/FloatingActionButton').default;
var ContentAdd = require('material-ui/svg-icons/content/add').default;
var AddDocuments = require('./AddDocuments.jsx');
var Dialog = require('./Dialog.jsx');
var DataSource = require('../services/DataSource.js');
var access = -1;
var style  = {
  marginRight: 20,
  marginBottom: 20,
};

function buildUrl(url) {
  if(dates.startDate && dates.endDate && (access === 2) ) {
    return url + '?date='+ dates.startDate +'&newDate=' + dates.endDate;
  }

  if(dates.startDate && dates.endDate && (access === 1) ) {
    return url + '&date='+ dates.startDate +'&newDate=' + dates.endDate;
  }

  if(dates.startDate && dates.endDate && (access === 0) ) {
    return url + '?date='+ dates.startDate +'&newDate=' + dates.endDate;
  }

  if(dates.startDate && dates.endDate ) {
    return url + '&date='+ dates.startDate +'&newDate=' + dates.endDate;
  }
  if(dates.endDate && !(dates.endDate) ) {
    alert('please enter a start date');
    return url;
  }

  return url;
}

function docAccess(value) {
  access = value;

  if(value === 0) {
    var userId = localStorage.getItem('id');
    DocAction.getDocument(buildUrl(userId));
    return;
  }

  accessByRole(value);

}

function accessByRole(value) {
  if(value === 1) {
    DocAction.getDocument({'id': null, 'url': buildUrl(urlOthers)});
    return;
  }

  accessAllDocuments(value);
}

function accessAllDocuments(value) {
  if(value === 2) {
    DocAction.getDocument({'id': null, 'url': buildUrl(urlAll)});
  }
}

function startDate(e, date) {
  dates.startDate = new Date(date);
}

function endDate(e, date) {
  dates.endDate = new Date(date);
  (access === -1 ) ? DocAction.getDocument({'id': null,
    'url': buildUrl(urlOthers)}) :
    docAccess(access);
}

module.exports = React.createClass({

  getInitialState: function () {
    DocStore.setSelf(this);
    if(window.localStorage) {
      urlOthers = '/api/v1/documents/?role='+localStorage.getItem('role');
    }
    console.log('in view docs', DataSource.getUserData());
    return {documents: [], open: false};
  },
  save: function() {
    DocAction.save(this);
  },
  cancel: function() {

  },
  click: function () {
    DocAction.addDocuments(this);
  },
  handleClose: function () {
    DocAction.cancel(this);
  },
  render: function () {
    return (
      <div>
      <div className='inputAcess'>
      <div className='left'>
      <DatePicker className='dateClass' change={startDate} texts='Start date' container='inline' land='landscape' hint='Start date'/>
      </div>

      <div className='left'>
      <DatePicker change={endDate} texts='End date' container='inline' land='landscape' hint='End date'/>
      </div>


      <div className='left'>
      <SelectField getValue={docAccess} />
      </div>
      </div>

      <div className='clear'> </div>
      <div className='paper'>
      <Documents data={this.props.data}/>
      <div className='float-right'>
    <FloatingActionButton backgroundColor='#4285f4' onTouchTap={this.click} style={style}>
      <ContentAdd />
    </FloatingActionButton>
      </div>

      <div>
        <Dialog scroll='true' display={<AddDocuments/>}
           save={this.save}
           cancel={this.handleClose} open={this.state.open}/>
       </div>
      </div>



      </div>
      )
  }
});