var React = require('react');

var CalItem = React.createClass({
  handleDelete: function() {
    this.props.onDelete(this.props.itemId);
  },

  render: function() {
    var styleA = {
      clear:'both',
      float:'left', 
      display:'block', 
      position:'relative'
    }

    return (
      <div style={styleA}>
        <label>{this.props.singleItem.title}</label>
        <span className="glyphicon glyphicon-remove-sign" onClick={this.handleDelete} />
      </div>
    )
  }
})
// <div onClick={handleClick.bind(this, i, props)} key={i}>{item}</div>

module.exports = CalItem;