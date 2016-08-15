
var React = require('react');
var ReactDom = require('react-dom');
var Container = require('./components/Container.jsx');
var docStore = require('./stores/SignUp.jsx');
var documentStore = require('./stores/Document.jsx');
var docAction = require('./actions/DocManagementActionCreator.jsx');
var userStore = require('./stores/User.jsx');
var roleStore = require('./stores/Role.jsx')
var Login = require('./components/LogIn.jsx');
var Documents = require('./components/HomePage.jsx');
var ShowDocument = require('./components/ShowDocument.jsx');
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
var getMuiTheme = require('material-ui/styles/getMuiTheme').default;
var blue = require('material-ui/styles/colors').blueA400;


var muiTheme = getMuiTheme({
  palette: {
    primary2Color: '#4285f4',
    primary1Color: '#4285f4',
    pickerHeaderColor: '#4285f4',
    accent1Color: '#4285f4'
  }
});

userStore.onChange(function (user) {
  console.log('user change');
  if(user.view === 'documents') {
    docAction.getDocument(user.data._id);
  }
});

documentStore.onChange(function (doc) {
  console.log('doc change');
  if(doc.view === 'documents') {
    renderDocuments(doc.data);
  }
});

roleStore.onChange(function (role) {
  console.log('role change');
});

docStore.onChange(function (items) {
  if(items.view) {
    renderDocuments(items.data);
    return;
  }

  if(items.show) {
    showDocuments(items.data);
    return;
  }

  switch(items) {
    case 'LogInView' :  renderLogInView();
    break;
    case 'SignUpView' :  renderSignUpView();
    break;
  }

  });

function showDocuments(items) {
  ReactDom.render(<MuiThemeProvider><ShowDocument id={items}/></MuiThemeProvider>, app)
}

function renderDocuments(items) {
  ReactDom.render(<MuiThemeProvider muiTheme={muiTheme} ><Documents  data={items} /></MuiThemeProvider>, app)
}

function renderLogInView () {
  ReactDom.render(<MuiThemeProvider muiTheme={muiTheme}><Login/></MuiThemeProvider>, app)
}

function renderSignUpView () {
  ReactDom.render(<Container/>, app)
}

renderLogInView();
