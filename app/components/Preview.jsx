var React = require('react');
var InputForm = require('./TextFields.jsx');
var UserHelper = require('../services/Users.js');
var url = '/api/v1/users/';
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
    return {value: this.props.data.content, title: this.props.data.title, access: this.props.data.access[0],
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

      <div>
      <div className='prev'><label>Title : </label> <span> {this.state.title} </span></div>
      <div className='prev'><label>Access : </label><span>{this.state.access} </span></div>
     <div className='prev'><label>Owned By : </label><span> {this.state.name}</span></div>
      <div className='prev'><label>Created By : </label><span>{this.state.dateCreated} </span></div>
      <div className='prev'><label>Last modified : </label><span>{this.state.dateModified} </span></div>
       <div className='prevs'><label>Content  </label> </div>
      <div className='preview' dangerouslySetInnerHTML={{__html: this.state.value }}/>
      </div>
      )
  }
})