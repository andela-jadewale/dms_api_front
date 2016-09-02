var React = require('react');
var Tabs = require('material-ui/Tabs').Tabs;
var Tab = require('material-ui/Tabs').Tab;
var ReactSwipeable = require('react-swipeable-views').default;
var ViewDocuments = require('./ViewDocuments.jsx');

module.exports = React.createClass({

  getInitialState: function () {
    return {};
  },
  render: function () {
    return (
      <div>
    <ViewDocuments data={this.props.data}/>
      </div>
      )
  }
})