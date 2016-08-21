var React = require('react');
var GridList = require('material-ui/GridList').GridList;
var GridTile = require('material-ui/GridList').GridTile;
var Buttons = require('./Buttons.jsx');
var StarBorder = require('material-ui/svg-icons/toggle/star-border').default;
var AddDocuments = require('./AddDocuments.jsx');
var ViewDocuments = require('./AddDocuments.jsx');
var IconButton = require('material-ui/IconButton').default;
var Paper = require('material-ui/Paper').default;
var Dialog = require('./Dialog.jsx');
var action = require('../actions/DocManagementActionCreator.jsx');
var FontIcon = require('material-ui/FontIcon').default;
var Blue = require('material-ui/styles/colors').blue400;
var Pink = require('material-ui/styles/colors').pinkA200;
var Red = require('material-ui/styles/colors').red500;
var HoverRed = require('material-ui/styles/colors').red800;
var DocAction = require('../actions/DocManagementActionCreator.jsx');
var DocStore = require('../stores/Document.jsx');
var SnackBar = require('./SnackBar.jsx');
var id = 0;
var deleteTitle = '';

var that = '';
var styles = {
    width: 900,
    height: 1000,
    marginTop: 10,
    backgroundColor: '#eeeeee'
  };

var root = {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '20',
    justifyContent: 'space-around',
}
var topStyle = {
  marginTop : 15,
  marginLeft: 20,
  padding: 15,
  border: '1px solid #d3d3d3',
  backgroundColor: '#FBFBFB',
  fontSize: '10px'
};

var sty = {
  marginTop : 10,
};

var paperStyle = {
  height: 200,
  width: 400,
  margin: 2,
  textAlign: 'center',
  display: 'inline-block',
}
var monthNames = [
  'January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December'
];

function getStyle (e) {
  var heightSize = e * 100;
  if((heightSize <= 600) && (e <=6 )) {
    heightSize = 750;
  }

  return {
    width: 900,
    height: heightSize,
    marginTop: 10,
    backgroundColor: '#eeeeee'
  };
}

function del(e) {
  return;
}

function getId() {
  return id++;
}

function setId() {
  id = 0;
}

function getOwnerId(id) {
  var ownerId = '';
  that.props.data.forEach(function (doc) {
    if(doc._id == id) {
      ownerId = doc.ownerId;
    }
  })

  return ownerId
}

function storageId() {
  return localStorage.getItem('id');
}

function isAuthorized(ownerId) {
  var owner = storageId();
  if(owner == ownerId) {
    return true;
  }

  return false;
}

function docDelete(e) {
  var ownerId = getOwnerId(e.target.title);

  if(isAuthorized(ownerId)) {
    DocAction.emitAction(e.target.title, 'Delete');
  }
  else {
    DocAction.emitAction(e.target.title, 'DeleteError');
  }
}

function getIdFromProps(data, id, flag) {
  if(!flag) {
    return data.props.data[id].ownerId;
  }

  return data.props.data[id]._id;
}

function docView(id, doc) {
  if(id == storageId()) {
    DocAction.emitAction(doc, 'Show');
  }
  else {
    DocAction.emitAction(doc, 'Hide');
  }
}

module.exports = React.createClass({
  getInitialState: function () {
    that = this;
    DocStore.setDocComp(this);
    return {open:false, id:false, owner: false, deleteTitle: '',
    delBox : false, snack: false}
  },
  save: function () {
    DocAction.emitAction(this, 'Save');
  },
  cancel: function () {
    DocAction.emitAction(this, 'Cancel');
  },
  yes: function () {
    DocAction.emitAction({'self': this, 'id': this.state.deleteTitle}, 'Confirm');
  },
  no: function () {
    DocAction.emitAction(this, 'CancelDelete');
  },
  handleOpen: function (e) {
    e.stopPropagation();
    if(!e.target.id) {
      return;
    }

    if(e.target.id === 'delete') {
      docDelete(e);
    }

    if(e.target.className === 'paperDiv') {
      docView(getIdFromProps(this, e.target.id),
        getIdFromProps(this, e.target.id, 'id'));
    }

    if(storageId() == e.target.className ) {
      docView(storageId(), e.target.id);
    }
  },
  handleClose: function (e) {
    this.setState({open: false});
  },

  setDate: function (e) {
    var date = new Date(e);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return 'modified '+ day + ' ' + monthNames[monthIndex] + ', ' + year;
  },
  delete: function (e) {
    e.stopPropagation();
  },
  render: function () {
    return (
      <div style={root}>
      <GridList cols='3' id={setId()}  cellHeight={200}
      style={getStyle(this.props.data.length)}>
      {
      this.props.data.length ?
        this.props.data.map(function (object) {
          return (
            <div className='grid' style={sty}>
            <GridTile id={object._id} style={topStyle} className={object.ownerId} onClick={that.handleOpen} key={object._id} title={object.title} subtitle={that.setDate(object.modifiedAt)}
            titleBackground='#fff'
            actionIcon={<FontIcon style={{fontSize: '15'}} id='delete' title={object._id} onClick={del(object._id)} hoverColor='#C62828' className="material-icons" color={Red} >delete</FontIcon>}
            >
              <div id={getId()} className='paperDiv' onClick={that.handleOpen} dangerouslySetInnerHTML={{__html: object.content }} />


            </GridTile>
            </div>
           )
        })
        :
        <div className='empty-data blink'> You have no documents please select access to view other documents </div>
      }
       <SnackBar open={this.state.snack} message='You have no rights to delete this document'/>
      <Dialog save={this.yes}
           cancel={this.no} open={this.state.delBox} title={this.state.deleteTitle}/>
      <Dialog display={<ViewDocuments owner={this.state.owner} update='true' id={this.state.id}/>}
           save={this.save}
           cancel={this.handleClose} open={this.state.open}/>
      </GridList>
      </div>
      )
  }
});
