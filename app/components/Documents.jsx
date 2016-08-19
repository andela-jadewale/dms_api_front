var React = require('react');
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
var getMuiTheme = require('material-ui/styles/getMuiTheme').default;
var Documents = require('./HomePage.jsx');
var documentStore = require('../stores/Document.jsx');
var DocAction = require('../actions/DocManagementActionCreator.jsx');
var DataSource = require('../services/DataSource.js');
var that = '';

var muiTheme = getMuiTheme({
  palette: {
    primary2Color: '#4285f4',
    primary1Color: '#4285f4',
    pickerHeaderColor: '#4285f4',
    accent1Color: '#4285f4'
  }
});

module.exports = React.createClass({
  componentDidMount: function () {
    that = this;
    documentStore.onChange(function (doc) {
      if(doc.view === 'documents') {
        that.setState({data: doc.data});
      }
    });
  },
  getInitialState: function () {
    DocAction.getDocument(DataSource.getUserData()._id || localStorage.getItem('id'));
    return {data: []};
  },
  render: function () {
    return (
        <MuiThemeProvider  muiTheme={muiTheme}>
          <Documents data={this.state.data}/>
        </MuiThemeProvider>
    )
  }
})