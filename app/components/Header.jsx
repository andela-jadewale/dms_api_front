var React = require('react');
var AppBar = require('material-ui/AppBar').default;
var MenuItem = require('material-ui/MenuItem').default;
var MoreVertIcon = require('material-ui/svg-icons/navigation/more-vert').default;
var IconMenu = require('material-ui/IconMenu').default;
var IconButton = require('material-ui/IconButton').default;
var Dialog = require('./Dialog.jsx');
var EditUser = require('./EditUser.jsx');
var UserAction = require('../actions/User.jsx');
var RoleAction = require('../actions/Role.jsx');
var AddRole = require('./AddRole.jsx');
var SnackBar = require('./SnackBar.jsx');


var styles = {
  backgroundColor: '#4285f4',
  position: 'fixed',
}

function editProfile(obj) {
  UserAction.emitAction({'self': obj, 'id': localStorage.getItem('id')},
   'Edit');
}

function addRole(obj) {
  RoleAction.emitAction({'self': obj, 'type': 'Show'});
}

function logOut() {
  UserAction.emitAction('Logout','LogOut');
}

module.exports = React.createClass({
  getInitialState: function () {
    return {open: false, data: '', show: false,
     snack: false, message: ''}
  },
  edit: function (e, index, obj) {
    switch(index.key) {
      case 'Edit': editProfile(this);
      break;
      case 'Role' : addRole(this);
      break;
      case 'Out' : logOut();
      break;
    }
  },
  cancel: function () {
    this.setState({open: false});
  },
  save: function () {
    UserAction.emitAction(this, 'ConfirmEdit');
    this.setState({open: false});
  },
  saveRole: function () {
    RoleAction.emitAction({'self': this, 'type': 'Add'});
  },
  cancelRole: function () {
    this.setState({show: false});
  },

  render: function () {
    return (
       <AppBar className='header-class' title='Document management System' style={styles} >
           <IconMenu
          iconStyle={{ fill: '#fff', marginTop: 8}}
          iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
          targetOrigin={{horizontal: 'right', vertical: 'center'}}
          anchorOrigin={{horizontal: 'right', vertical: 'center'}}
          onItemTouchTap={this.edit} animated='true'
          >
          <MenuItem key='Edit' primaryText="Edit Profile" />
          <MenuItem key='Role' primaryText="Add Role" />
          <MenuItem key='Out' primaryText="Sign out" />
          </IconMenu>
          <Dialog title='Edit User' display={<EditUser data={this.state.data} /> }
           save={this.save}
           cancel={this.cancel} open={this.state.open}/>

           <Dialog title='Add new Role' display={<AddRole/> }
           save={this.saveRole}
           cancel={this.cancelRole} open={this.state.show}/>
          <SnackBar open={this.state.snack} message={this.state.message}/>
       </AppBar>
    )
  }
});