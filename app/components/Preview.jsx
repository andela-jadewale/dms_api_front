var React = require('react');
var InputForm = require('./TextFields.jsx');
var UserHelper = require('../services/Users.js');
var url = '/api/v1/users/';
var FontIcon = require('material-ui/FontIcon').default;
var Blue = require('material-ui/styles/colors').blue400;
var Gray = require('material-ui/styles/colors').grey400;
var Pink = require('material-ui/styles/colors').pinkA200;
var Red = require('material-ui/styles/colors').red500;
var HoverRed = require('material-ui/styles/colors').red800;
var Green = require('material-ui/styles/colors').green500;
var monthNames = [
  'January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December'
];

module.exports = React.createClass({
  getInitialState: function () {

    var created = this.parseDate(this.props.data.createdAt);
    var modified = this.parseDate(this.props.data.modifiedAt);
    UserHelper.sendRequest(url,
      'GET', '', this.listener);
    return {value: this.props.data.content, title: this.props.data.title, access: this.props.data.access[0] || 'No Access',
    name: '', dateCreated: created, dateModified: modified}
  },
  listener: function (e) {
    var data = e;
    var that = this;
    data.forEach(function (user) {
      if(user._id == that.props.data.ownerId){
        that.setState({name: user.name.first + ' '+ user.name.last})
      }
    })
  },
  parseDate: function (e) {
    var date = new Date(e);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return ''+ day + ' ' + monthNames[monthIndex] + ', ' + year;
  },
  render: function () {
    return (

      <div className='p'>
      <div className='preview' dangerouslySetInnerHTML={{__html: this.state.value }}/>
      <div className='prep'> </div>
    <span>  <FontIcon style={{fontSize: '15', marginRight: '10'}} title='access'  hoverColor={Green} className="material-icons" color={Gray}>no_encryption</FontIcon>
      {this.state.access} </span>
      <div className='pres'>

     <span> <FontIcon style={{fontSize: '15', marginRight: '10'}} title='owned by'  hoverColor='#C62828' className="material-icons" color={Gray}>person</FontIcon> {this.state.name}</span></div>
      <div className='pres'>  <span> <FontIcon style={{fontSize: '15', marginRight: '10'}} title='date created'  hoverColor='#C62828' className="material-icons" color={Gray} >today</FontIcon>{this.state.dateCreated} </span></div>
      </div>
      )
  }
})