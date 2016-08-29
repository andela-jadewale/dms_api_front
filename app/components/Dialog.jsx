var React = require('react');
var Dialog = require('material-ui/Dialog').default;
var Buttons = require('./FlatButton.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return {open: false}
  },
  render: function () {
    return (
        <Dialog
          title={this.props.title}
          autoScrollBodyContent={this.props.scroll}
          contentStyle={this.props.style}
          actions={[<Buttons width='true'  type='Button' click={this.props.cancel} label='Close'/>
             ,<Buttons width='true' type='Button' click={this.props.save} label='Save'/>
            ]}
          modal={true}
          open={this.props.open} showDialog={this.props.open}
        >
          {
          this.props.display
        }
        </Dialog>
      )
  }
});