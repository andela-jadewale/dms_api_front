var React = require('react');
var ReactDom = require('react-dom');
var Container = require('./components/Container.jsx');
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
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var browserHistory = require('react-router').browserHistory;
var LandingPage = require('./components/LandingPage.jsx');
var muiTheme = getMuiTheme({
  palette: {
    primary2Color: '#4285f4',
    primary1Color: '#4285f4',
    pickerHeaderColor: '#4285f4',
    accent1Color: '#4285f4'
  }
});

userStore.onChange(function (user) {
  if(user.view === 'documents') {
    docAction.getDocument(user.data._id);
    browserHistory.push('/documents');
  }
  if(user.view === 'signOut') {
    signOut();
  }
});

documentStore.onChange(function (doc) {
  if(doc.view === 'documents') {
    renderDocuments(doc.data);
  }
});

roleStore.onChange(function (role) {
});


function renderDocuments(items) {
  ReactDom.render(<MuiThemeProvider muiTheme={muiTheme} ><Documents  data={items} /></MuiThemeProvider>, app)
}

function signOut(items) {
  ReactDom.render(<MuiThemeProvider muiTheme={muiTheme} ><LandingPage/></MuiThemeProvider>, app)
}

ReactDom.render(<Router history={browserHistory}>
                  <Route path="/" component={LandingPage}/>
                  <Route path="signup" component={Container}/>
                  <Route path="signout" component={LandingPage}/>
                 </Router>, app)

