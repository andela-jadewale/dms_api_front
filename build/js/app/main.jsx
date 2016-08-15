
var React = require('react');
var ReactDom = require('react-dom');
var Container = require('./components/Container.jsx');
var docStore = require('./stores/SignUp.jsx');
var Login = require('./components/LogIn.jsx');
var Documents = require('./components/HomePage.jsx');

var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;

docStore.onChange(function (items) {

  if(items.view) {
    renderDocuments(items.data);
    return;
  }

  switch(items) {
    case 'LogInView' :  renderLogInView();
    break;
    case 'SignUpView' :  renderSignUpView();
    break;
  }

  })

function renderDocuments(items) {
  ReactDom.render(<MuiThemeProvider><Documents data={items.data} /></MuiThemeProvider>, app)
}

function renderLogInView () {
  ReactDom.render(<MuiThemeProvider><Login/></MuiThemeProvider>, app)
}

function renderSignUpView () {
ReactDom.render(<Container/>, app)
}

renderLogInView();
var dispatcher = require('../dispatcher/dispatcher.js');

module.exports = {
  signUpView: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:SignUpView'
    })
  },
  logInView: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:LogInView'
    })
  },
  documents: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:Documents'
    })
  },
  signUp: function (data) {
    dispatcher.dispatch({
      payload: data,
      type: 'docMan:SignUp'
    })
  }
}
var React = require('react');
var InputForm = require('./TextFields.jsx');
var SelectField = require('./SelectFields.jsx');
var Buttons = require('./Buttons.jsx');
var roles = [{role: 'Admin'}, {role: 'Guest'}, {role: 'User', }];
var UserHelper = require('../services/Users.js');
var url = '/api/v1/roles/';
var docUrl = '/api/v1/documents';
var DocumentData = {};

function access(e) {
  DocumentData.role = e;
}

module.exports = React.createClass({
  getInitialState: function () {
    UserHelper.roles(url, 'GET', null, this.listener);
    return {roles: [{title: 'test'}], open: false};
  },
  listener: function (obj) {
    if(obj.role) {
    this.setState({roles: obj.role})
    }else{
      alert(obj);
      console.log(obj);
      //this.setState({open: true})
    }
  },
  documentText: function (e) {
    e.stopPropagation();
    DocumentData.content = e.target.value;
  },
  titleText: function (e) {
    e.stopPropagation();
    DocumentData.title = e.target.value;
  },

  value: function (e) {

  },
  submit: function (e) {
    e.preventDefault();
    DocumentData.id = localStorage.getItem('id');
    UserHelper.createDoc(docUrl, 'POST', DocumentData, this.listener);
  },
  render: function () {
    return (
      <div>
      <form onSubmit={this.submit}>
      <InputForm change={this.titleText} float='Add Title' fullWidth='true' required='true' hint='Enter Title' />
      <div>
      <SelectField getValue={access} roles={this.state.roles} />
      </div>
      <InputForm float='Add Documents' change={this.documentText} fullWidth='true' required='true' hint='Enter Document Content then save' row='10' textArea='true' />
      <div>
      <Buttons className='fullWidth' type='Submit' bg='#00bcd4' width='true' label='Upload' />
      </div>
      </form>
      </div>
    )
  }
})
var React = require('react');
var RaisedButtons = require('material-ui/RaisedButton').default;
var FontIcon = require('material-ui/FontIcon').default;

module.exports = React.createClass({
  render: function () {
    return (
         <RaisedButtons backgroundColor={this.props.bg} type={this.props.type}
         onTouchTap={this.props.click}
         fullWidth={this.props.width} className={this.props.className} label={this.props.label}/>
    )
  }
})
var React = require('react');
var tapPlugin = require('react-tap-event-plugin');
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
var SignUpBody = require('./SignUp.jsx');

tapPlugin();
module.exports = React.createClass({
  render: function () {
    return (
        <MuiThemeProvider>
          <SignUpBody/>
        </MuiThemeProvider>
    )
  }
})
var React = require('react');
var DatePicker = require('material-ui/DatePicker').default;

module.exports = React.createClass({
  render: function () {
    return (
      <DatePicker floatingLabelText={this.props.texts} hintText={this.props.hint} container={this.props.container} mode={this.props.land} />
      )
  }
});


var React = require('react');
var Dialog = require('material-ui/Dialog').default;
var AddDocuments = require('./AddDocuments.jsx');
var Buttons = require('./Buttons.jsx');
module.exports = React.createClass({
  click: function () {
  },
  render: function () {
    return (
        <Dialog
          title="Dialog With Actions"
          actions={<Buttons type='Submit' onClick={this.click} label='Cancel'/>}
          modal={true}
          open={this.props.open}
        >
          {
          this.props.display
        }
        </Dialog>
      )
  }
});
var React = require('react');
var Buttons = require('./Buttons.jsx');
var InputForm = require('./TextFields.jsx');
var Login = require('./LogIn.jsx');
var SelectField = require('./SelectFields.jsx');
var UserHelper = require('../services/Users.js');
var action = require('../actions/DocManagementActionCreator.jsx');
var SnackBar = require('./SnackBar.jsx');
var Names = {};
var url = '/api/v1/users/';

function lastName(e) {
  Names.lastName = e.target.value;
}
module.exports = React.createClass({
  getInitialState: function (e) {
    return {lastName: this.props.data.name.last, firstName: this.props.data.name.first }
  },
  firstName: function (e) {
   Names.firstName = e.target.value;
   this.setState({firstName: Names.firstName})
    },
  lastName: function (e) {
   Names.lastName = e.target.value;
   this.setState({lastName: Names.lastName})
    },
  submit: function (e) {
    var id = localStorage.getItem('username');
    e.preventDefault();
    UserHelper.updateUser(url + id, 'PUT', Names, this.listener);
  },
  listener: function (e) {
    alert(e);
  },
  render: function () {
    return (
      <div>
      <form onSubmit={this.submit} className='form-horizontal'>

          <div className='form-group'> <InputForm type='text' value={this.state.lastName}  change={this.lastName}   fullWidth='true' hint={this.props.data.name.last} float='Last Name'/> </div>
          <div className='form-group'> <InputForm type='text' value={this.state.firstName}  change={this.firstName}  fullWidth='true' hint={this.props.data.name.first} float='First Name'/> </div>
          <div className='form-group'> <InputForm type='email' value={this.props.data.email} disable='true' required='true' fullWidth='true' hintText='Email' float='Email'/> </div>
          <div className='form-group'> <InputForm type='text' value={this.props.data.username} disable='true' required='true' fullWidth='true' hintText='Username' float='Username'/> </div>
          <div className='form-group'> <InputForm type='text' value={this.props.data.role} disable='true' required='true' fullWidth='true' hintText='Role' float='Role'/> </div>
          <div className='form-group'>
          </div>
          <div className='clear'> </div>
          <div className='form-group'> <Buttons className='fullWidth' type='Submit' bg='#00bcd4' width='true' label='Update'/> </div>
          <SnackBar open={false} message='User Account created'/>
        </form>
      </div>
    )
  }
});
var React = require('react');
var GridList = require('material-ui/GridList').GridList;
var GridTile = require('material-ui/GridList').GridTile;
var Buttons = require('./Buttons.jsx');
var StarBorder = require('material-ui/svg-icons/toggle/star-border').default;
var AddDocuments = require('./AddDocuments.jsx');
var Dialog = require('./Dialog.jsx');
var styles = {
    height: 250,
    overflowY: 'auto',
    marginBottom: 24,
  };

function scream (e) {
  alert('scream');
}
module.exports = React.createClass({
  getInitialState: function () {
    return {open:false}
  },
   handleOpen: function (e) {
    alert('hello');
    this.setState({open: true});
  },
  handleClose: function (e) {
    this.setState({open: false});
  },
  render: function () {
    return (
      <div>
      <GridList cols='5'  cellHeight={200}
      style={styles} >

      {
        this.props.data.map(function (object) {
          return (
            <GridTile key={object._id} title={object.title} subtitle={object.createdAt}
            actionIcon={<div><div><Buttons click={scream} label='Edit'><StarBorder color='white' /></Buttons> </div>
          <div><Buttons label='Delete'><StarBorder color='white' /></Buttons></div> </div>
        }
             >
              { object.content }

            </GridTile>
           )
        })
      }

      </GridList>
      </div>
      )
  }
});
var React = require('react');
var AppBar = require('material-ui/AppBar').default;
var MenuItem = require('material-ui/MenuItem').default;
var MoreVertIcon = require('material-ui/svg-icons/navigation/more-vert').default;
var IconMenu = require('material-ui/IconMenu').default;
var IconButton = require('material-ui/IconButton').default;
var Dialog = require('./Dialog.jsx');
var EditUser = require('./EditUser.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return {open: false}
  },
  edit: function (e, index, obj) {
    this.setState({open: true});
  },
  render: function () {
    return (
       <AppBar title='Document management System'>
           <IconMenu
          iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          onItemTouchTap={this.edit} animated='true'
          >
          <MenuItem  primaryText="Edit Profile" />
          <MenuItem primaryText="Help" />
          <MenuItem primaryText="Sign out" />
          </IconMenu>
          <Dialog display={<EditUser data={this.props.data} /> } open={this.state.open}/>
       </AppBar>
    )
  }
});
var React = require('react');
var Header = require('./Header.jsx');
var Tabs = require('./TabSection.jsx');
var InputForm = require('./TextFields.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    localStorage.setItem('id', this.props.data._id);
    localStorage.setItem('username', this.props.data.username);
    localStorage.setItem('role', this.props.data.role );
    return {}
  },
  search: function (e) {

  },
  render: function () {
    return (
      <div>
       <Header data={this.props.data}  />
       <div className='homePageSearch'>
        <InputForm type='text' change={this.search} required='true' fullWidth='true' hint='Search for documents' />
       </div>

       <Tabs />
      </div>
    )
  }
})
var React = require('react');
var TextField = require('material-ui/TextField').default;

module.exports = React.createClass({
  getInitialState: function () {
    return {input:''};
  },
  username: function (e) {
    this.setState({input: e.target.value});
    this.props.getValue(e.target.value)
  },

  render: function () {
    return (
      <div className='form-horizontal'>
        <div className='form-group'>
          <TextField value={this.state.input} onChange={this.username} type='text' hintText='Username' floatingLabelText='Username'/>
        </div>
        <div className='form-group'>
          <TextField type='email' hintText='Email' floatingLabelText='Email'/>
        </div>
        <div className='form-group'>
          <TextField type='password' hintText='Password' floatingLabelText='Password'/>
        </div>
      </div>

    )
  }
})
var React = require('react');
var Buttons = require('./Buttons.jsx');
var InputForm = require('./TextFields.jsx');
var action = require('../actions/DocManagementActionCreator.jsx');
var UserHelper = require('../services/Users.js');
var params = {};
var url = '/api/v1/users/login';

function username(e) {
 params.username = e.target.value;
}

function password(e) {
  params.password = e.target.value;
}

function submit (e) {
  e.preventDefault();
  UserHelper.logIn(url, 'POST', params, listener);
}

function listener(obj) {
  obj.token ? success(obj) : alert('error');
}

function success(obj) {
  localStorage.setItem('token', obj.token);
  action.documents(obj);
}

function logIn(e) {
  action.logIn();
}

function signUp(e) {
  action.signUpView('SignUpView');
}
module.exports = React.createClass({
  render: function () {
    return (
        <div className='signin-header'>
        <div className='image-div'> </div>
        <form onSubmit={submit} className='form-horizontal'>
          <div className='form-group'> <InputForm type='text' change={username} required='true' fullWidth='true' hintText='Username' float='Username'/> </div>
          <div className='form-group'> <InputForm type='password' change={password} required='true' fullWidth='true' hintText='Password' float='Password'/> </div>
          <div className='clear'> </div>
          <div className='form-group'> <Buttons type='Submit' className='fullWidth' bg='#00bcd4' width='true' label='LogIn'/> </div>
          <div className='form-group'>
            <span> Dont have an account ? <a href='#' onClick={signUp}> Sign Up </a></span>
          </div>
        </form>
        </div>
    )
  }
})
var React = require('react');
var Buttons = require('./Buttons.jsx');

module.exports = React.createClass({
  render: function () {
    return (
      <div className='paginate'>
        <Buttons bg='#00bcd4' className='margin-12' label='1'/>

         <Buttons bg='#00bcd4' className='margin-12' label='2' />

          <Buttons bg='#00bcd4' className='margin-12' label='3' />
      </div>
      )
  }
});
var React = require('react');
var RaisedButtons = require('material-ui/RaisedButton').default;
var FontIcon = require('material-ui/FontIcon').default;

module.exports = React.createClass({
  render: function () {
    return (
      <div>
      //margin-12
        <RaisedButtons className={this.props.className} label={this.props.label}/>
      </div>
    )
  }
})
var React = require('react');
var SelectField = require('material-ui/SelectField').default;
var MenuItem = require('material-ui/MenuItem').default;

module.exports = React.createClass({
  getInitialState: function (e) {
    return {select:null}
  },
  handleChange: function (e, value, index) {
    this.setState({select: value})
  },
  render: function () {
    return (
        <SelectField floatingLabelText='Select Access' value={this.state.select} onChange={this.handleChange}>
          <MenuItem value={1} primaryText='My Documents' />
          <MenuItem value={2} primaryText='Other Documents' />
          <MenuItem value={3} primaryText='All documents' />
        </SelectField>
    )
  }
})
var React = require('react');
var SelectField = require('material-ui/SelectField').default;
var MenuItem = require('material-ui/MenuItem').default;

module.exports = React.createClass({
  getInitialState: function (e) {
    return {select:null}
  },
  handleChange: function (e, value, obj) {
    this.setState({select: value})
    this.props.getValue(this.props.roles[value].title);
  },
  render: function () {
    return (
        <SelectField fullWidth={this.props.fullWidth}
         floatingLabelText='Select Access' value={this.state.select} onChange={this.handleChange}>
        {
          this.props.roles.map(function (users, index){
            return (
               <MenuItem value={index} primaryText={users.title } />
              )
          })
        }
        </SelectField>
    )
  }
})
var React = require('react');
var Buttons = require('./Buttons.jsx');
var InputForm = require('./TextFields.jsx');
var Login = require('./LogIn.jsx');
var SelectField = require('./SelectFields.jsx');
var UserHelper = require('../services/Users.js');
var action = require('../actions/DocManagementActionCreator.jsx');
var SnackBar = require('./SnackBar.jsx');
var UserData = {};
var url = '/api/v1/roles/';
var signUpUrl = '/api/v1/users/';

function userName(e) {
  UserData.username = e.target.value;
}

function lastName(e) {
  UserData.lastName = e.target.value;
}

function firstName(e) {
  UserData.firstName = e.target.value;
}

function email(e) {
  UserData.email = e.target.value;
}
function password(e) {
  UserData.password = e.target.value;
}

function rePassword(e) {
  UserData.rePassword = e.target.value;
}

function access(e) {
  UserData.role = e;
}

module.exports = React.createClass({
  getInitialState: function () {
    UserHelper.roles(url, 'GET', null, this.listener);
    return {roles: [{title: 'test'}], open: false};
  },
  listener: function (obj) {
    if(obj.role) {
    this.setState({roles: obj.role})
    }else{
      alert(obj);
      console.log(obj);
      this.setState({open: true})
    }


  },
  login: function (e) {
    action.logInView('LogInView');
  },
  submit: function (e) {
    e.preventDefault();
    UserData.role = this.state.roles[parseInt(UserData.role)].title;
    UserHelper.roles(signUpUrl, 'POST', UserData, this.listener);
  },

  render: function () {
    return (
        <div className='signin-header'>
        <div className='image-div'> </div>
        <form onSubmit={this.submit} className='form-horizontal'>
          <div className='form-group'> <InputForm type='text' change={userName} required='true' fullWidth='true' hintText='Username' float='Username'/> </div>
          <div className='form-group'> <InputForm type='text' change={lastName} required='true' fullWidth='true' hintText='Last Name' float='Last Name'/> </div>
          <div className='form-group'> <InputForm type='text' change={firstName} required='true' fullWidth='true' hintText='First Name' float='First Name'/> </div>
          <div className='form-group'> <InputForm type='email' change={email} required='true' fullWidth='true' hintText='Email' float='Email'/> </div>
          <div className='form-group'> <InputForm type='password' change={password} required='true' fullWidth='true' hintText='Password' float='Password'/> </div>
          <div className='form-group'> <InputForm type='password' change={rePassword} required='true' fullWidth='true' hintText='Re enter Password' float='Re enter Password'/> </div>
          <div className='form-group'> <SelectField getValue={access} fullWidth='true' roles={this.state.roles} /> </div>
          <div className='form-group'>
            <span> By clicking on Sign up, you agree to <a href='#'>terms & conditions </a> and <a href='#'>privacy policy</a> </span>
          </div>
          <div className='clear'> </div>
          <div className='form-group'> <Buttons className='fullWidth' type='Submit' bg='#00bcd4' width='true' label='Sign Up'/> </div>
          <div className='form-group'>
            <span> ALready have an account ? <a href='#' onClick={this.login}> Login </a></span>
          </div>
          <SnackBar open={this.state.open} message='User Account created'/>
        </form>
        </div>
    )
  }
})
var React = require('react');
var SignUpForm = require('./SignUpForm.jsx');

module.exports = React.createClass({
  render: function () {
    return (
        <div className='signin-header'>
          <SignUpForm/>
        </div>
    )
  }
})
var React = require('react');
var RaisedButtons = require('material-ui/RaisedButton').default;
var FontIcon = require('material-ui/FontIcon').default;

module.exports = React.createClass({
  render: function () {
    return (
        <RaisedButtons className='' type='Submit' label='Sign Up'
        />
    )
  }
})
var React = require('react');
var Buttons = require('./RaisedButtons.jsx');
var InputForm = require('./InputType.jsx');
var SignButton = require('./SignUpButton.jsx');
var action = require('../actions/DocManagementActionCreator.jsx');

module.exports = React.createClass({
  submit: function (e) {
    e.preventDefault();
    action.signUp({name: {'username':'test','password':'test'}})
  },
  getInputValue: function(inputValue) {
    console.log(inputValue)
  },
  render: function () {
    return (
        <div className='form-container'>
          <section className='row text-center '>
            <Buttons label='Twiter'/>
            <Buttons label='Facebook'/>
          </section>
          <form onSubmit={this.submit} className='form-horizontal'>
            <InputForm getValue={this.getInputValue}/>
            <p>By signin up you agree to terms and conditions</p>
            <SignButton/>
          </form>
          <p>Login</p>
        </div>
    )
  }
})
var React = require('react');
var SnackBar = require('material-ui/Snackbar').default;

module.exports = React.createClass({
  render: function () {
    return (
        <SnackBar open={this.props.open} message={this.props.message} autoHideDuration={4000}  />
      )
  }
});
var React = require('react');
var Tabs = require('material-ui/Tabs').Tabs;
var Tab = require('material-ui/Tabs').Tab;
var ReactSwipeable = require('react-swipeable-views').default;
var AddDocument = require('./AddDocuments.jsx');
var ViewDocuments = require('./ViewDocuments.jsx');


module.exports = React.createClass({

  getInitialState: function () {
    return {slideIndex:0};
  },
  handleChange: function (value) {
    this.setState({slideIndex: value});
  },
  render: function () {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Add Document" value={0}>
            <AddDocument/>
          </Tab>
          <Tab label="View Documents" value={1} >
            <ViewDocuments/>
          </Tab>
          <Tab label="Add Roles" value={2} > Who </Tab>

        </Tabs>
      </div>
      )
  }
})
var React = require('react');
var TextField = require('material-ui/TextField').default;

module.exports = React.createClass({

  render: function () {
    return (
        <TextField type={this.props.type} onChange={this.props.change}
        fullWidth={this.props.fullWidth} required={this.props.required}
        multiLine={this.props.textArea} rows={this.props.row} value={this.props.value}  disabled={this.props.disable}
        hintText={this.props.hint} floatingLabelText={this.props.float}/>
    )
  }
})
var React = require('react');
var DatePicker = require('./DatePicker.jsx');
var SelectField = require('./SelectFieldUsers.jsx');
var Documents = require('./GridList.jsx');
var Pagination = require('./Pagination.jsx');
var UserHelper = require('../services/Users.js');
var url = '/api/v1/documents/?role=';

module.exports = React.createClass({

  getInitialState: function () {
    var role = localStorage.getItem('role');
    UserHelper.getDoc(url + role , 'GET', null, this.listener);
    return {documents: []};
  },
  changeDocument: function () {

  },
  listener: function (e) {
    console.log(e.data);
    this.setState({documents: e.data});
  },
  render: function () {
    return (
      <div>

      <div className='container'>
      <div className='left'>
      <DatePicker texts='Start date' container='inline' land='landscape' hint='Start date'/>
      </div>

      <div className='left'>
      <DatePicker texts='End date' container='inline' land='landscape' hint='End date'/>
      </div>


      <div>
      <SelectField/>
      </div>
      </div>

      <div className='clear'> </div>

      <div>
      <Documents data={this.state.documents}/>
      </div>

      <div>
        <Pagination/>
      </div>

      </div>
      )
  }
});
var guid = require('guid');
var listeners = {};
module.exports = {

  register: function (cb) {
    'use strict';
    var id = guid.raw();
    listeners[id] = cb;

    return id;
  },

  dispatch: function (payload) {
    'use strict';
    console.log('Dispatching ', payload);
    for(var id in listeners) {
      var listener = listeners[id];
      listener(payload);
    }
  }
};

module.exports =  location.protocol + '//' + location.host;

'use strict';

var valid = true;

module.exports =  {
  logUserIn : function (params) {
    if((!params.username) || ((!params.password))) {
      valid = false;
    }

    return valid;
  },

  signUp : function (params) {
    if(!params.username) {
      valid = false;
    }
    if(!params.lastName) {
      valid = false;
    }
    if(!params.firstName) {
      valid = false;
    }
    if((!params.email) && (validEmail(params.email))) {
      valid = false;
    }

    if(!params.password) {
      valid = false;
    }

    if(!params.role) {
      valid = false;
    }

    return valid;
  }

};

function validEmail(data) {
  return true;
}



  var User = require('./ParseUsers.js'),
    Request = require('./xhrRequest.js');

  module.exports =  {
    logIn: function (url, type, params, cb) {
      'use strict';
      User.logUserIn(params)? sendRequest(url, type, params, cb): cb(Error());
    },

     signUp: function (params) {
      'use strict';
      User.signUp(params)? sendRequest(url, type, params, cb): cb(Error());
    },

    roles: function (url, type, params, cb) {
      'use strict';
      sendRequest(url, type, params, cb);
    },

    updateUser: function (url, type, params, cb) {
      'use strict';
      sendRequest(url, type, params, cb);
    },

    createDoc: function (url, type, params, cb) {
      'use strict';
      sendRequest(url, type, params, cb);
    },

    getDoc: function (url, type, params, cb) {
      'use strict';
      sendRequest(url, type, params, cb);
    },
  };
    function Error() {
      'use strict';
      return 'Please All details are required';
    }

    function sendRequest(url, type, params, cb) {
      'use strict';
      Request(url, type, params, cb);
    }





  'use strict';

  var eventType = 'readystatechange';
  var HostAddress = require('./HostName');

  var requestFromServer = function (url, type, obj, cb) {
    try{
      var req = createRequest();
      addRequestListener(req, cb);
      sendRequest(req, url, type, obj);
    }
    catch (exception) {
      console.log(exception);
    }
  };

  var createRequest = function () {
    return new XMLHttpRequest();
  };

  var addRequestListener = function (req, cb) {
    req.addEventListener('readystatechange',
    function (){ processResponse(req, cb); }, true);
  };

  var sendRequest = function (req, url, type, obj) {
    req.open(type, HostAddress + url, true);
    req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    req.setRequestHeader('x-access-token', localStorage.getItem('token'));
    req.send(JSON.stringify(obj));
  };

  function processResponse (req, cb) {
    var jsonData ='';
    if (req.readyState === 4 &&  req.status === 200) {
      jsonData = JSON.parse(req.responseText);
      cb(jsonData);
    }
    if (req.readyState === 4 &&  req.status === 201) {
      jsonData = JSON.parse(req.responseText);
      cb(jsonData);
    }
    if (req.readyState === 4 &&  req.status === 409) {
      jsonData = JSON.parse(req.responseText);
      cb(jsonData);
    }

    if (req.readyState === 4 &&  req.status === 403) {
      jsonData = JSON.parse(req.responseText);
      cb(jsonData);
    }

  }


  module.exports = requestFromServer;


var dispatcher = require('../dispatcher/dispatcher.js');

function SignUp () {

  var action = '';
  var listeners = [];

  function getItems() {
    return action;
  }

  function onChange(listener) {
    listeners.push(listener);
  }

  function triggerListeners() {
    listeners.forEach(function(listener) {
      listener(action)
    })

  }

  function signUp(data) {
    action = data;
    triggerListeners();
  }

  function documents(data) {
    action = {'data': data, 'view': 'documents'};
    triggerListeners();
  }

   function signUpView(data) {
    action = data;
    triggerListeners();
  }

  function logInView(data) {
    action = data;
    triggerListeners();
  }

  dispatcher.register(function (e) {
    var split = e.type.split(':');
    if(split[0] === 'docMan') {
      switch(split[1]) {
        case 'SignUp': signUp(e.payload);
        break;
        case 'Documents': documents(e.payload);
        break;
        case 'SignUpView': signUpView(e.payload);
        break;
        case 'LogInView': logInView(e.payload);
      }

    }
  })

  return {
    getItems: getItems,
    onChange: onChange
  }

}

module.exports = new SignUp();