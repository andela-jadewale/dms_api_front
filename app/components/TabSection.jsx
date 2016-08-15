var React = require('react');
var Tabs = require('material-ui/Tabs').Tabs;
var Tab = require('material-ui/Tabs').Tab;
var ReactSwipeable = require('react-swipeable-views').default;
var ViewDocuments = require('./ViewDocuments.jsx');

module.exports = React.createClass({

  getInitialState: function () {
    return {slideIndex:0};
  },
  handleChange: function (value) {
    this.setState({slideIndex: value});
  },
  render: function () {
    return (
      <div>
       <Tabs
        className='tabs'
          onChange={this.handleChange}
          value={this.state.slideIndex}
        inkBarStyle={{backgroundColor: '#fff'}}
        tabItemContainerStyle={{backgroundColor: '#4285f4',
        borderBottom: 'solid 2px', borderColor: '#fff'}}
         underlineFocusStyle={{borderBottom: 'solid 2px', borderColor: '#fff'}}

        >
          <Tab  label="View Documents" value={0}
            inkBarStyle={{borderBottom: 'solid 6px', borderColor: '#fff'}}
        tabItemContainerStyle={{backgroundColor: '#4285f4',
        borderBottom: 'solid 2px', borderColor: '#fff'}}
         underlineFocusStyle={{borderBottom: 'solid 2px', borderColor: '#fff'}}

           >
            <ViewDocuments data={this.props.data}/>
          </Tab>
        </Tabs>
      </div>
      )
  }
})