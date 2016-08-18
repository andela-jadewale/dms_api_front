var React = require('react');
var tapPlugin = require('react-tap-event-plugin');
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
var getMuiTheme = require('material-ui/styles/getMuiTheme').default;
var SignUpBody = require('./SignUp.jsx');

var muiTheme = getMuiTheme({
  palette: {
    primary2Color: '#4285f4',
    primary1Color: '#4285f4',
    pickerHeaderColor: '#4285f4',
    accent1Color: '#4285f4'
  }
});

module.exports = React.createClass({
  render: function () {
    return (
        <MuiThemeProvider  muiTheme={muiTheme}>
          <SignUpBody/>
        </MuiThemeProvider>
    )
  }
})