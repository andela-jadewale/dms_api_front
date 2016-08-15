var React = require('react');
var InputForm = require('./TextFields.jsx');
var Data ={};
var DataSource = require('../services/DataSource.js');

function roleText(e) {
  Data.title = e.target.value;
}

module.exports = React.createClass({
  getInitialState: function () {
    DataSource.setContent(Data);
    return {role: '', open: false, message: ''};
  },
  render: function () {
    return (
      <InputForm change={roleText}  float='Add Role' fullWidth='true' required='true' hint='Enter Role' />
      )
  }
})