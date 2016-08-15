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