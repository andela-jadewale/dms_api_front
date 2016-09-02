var React = require('react');
var FlatButtons = require('material-ui/FlatButton').default;
module.exports = React.createClass({
  render: function () {
    return (
         <FlatButtons backgroundColor={this.props.bg} type={this.props.type}
         onTouchTap={this.props.click}
         fullWidth={this.props.width} className={this.props.className} label={this.props.label}/>
    )
  }
})