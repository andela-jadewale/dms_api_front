var React = require('react');
var tapPlugin = require('react-tap-event-plugin');
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
var Login = require('./LogIn.jsx');

tapPlugin();
module.exports = React.createClass({
  render: function () {
    return (
        <MuiThemeProvider>
          <Login/>
        </MuiThemeProvider>
    )
  }
})
