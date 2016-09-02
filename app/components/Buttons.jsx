var React = require('react');
var RaisedButtons = require('material-ui/RaisedButton').default;
var FontIcon = require('material-ui/FontIcon').default;

module.exports = React.createClass({
  render: function () {
    return (
         <RaisedButtons backgroundColor={this.props.bg} type={this.props.type}
         onTouchTap={this.props.click} labelStyle={{color: '#fff'}}
         fullWidth={this.props.width} className={this.props.className} label={this.props.label}/>
    )
  }
})