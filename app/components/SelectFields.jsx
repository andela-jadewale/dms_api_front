var React = require('react');
var SelectField = require('material-ui/SelectField').default;
var MenuItem = require('material-ui/MenuItem').default;

module.exports = React.createClass({
  getInitialState: function (e) {
    if(this.props.value ) {
      return {select: 1}
    }

    return {select:null};
  },
  handleChange: function (e, value, obj) {
    this.setState({select: value});
    this.props.getValue(this.props.roles[value].title);
  },
  render: function () {
    return (
        <SelectField fullWidth={this.props.fullWidth}
         floatingLabelText='Select Access'  hintStyle={{color: 'black'}} floatingLabelFixed='true' autoWidth='true' value={this.state.select} onChange={this.handleChange}>
        {
          this.props.roles.map(function (users, index){
            return (
               <MenuItem value={index} primaryText={users.title } />
              )
          })
        }
        </SelectField>
    )
  }
})