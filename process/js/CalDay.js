var React = require('react');
var _ = require('lodash');

var CalItem = require('./CalItem')

var CalDay = React.createClass({
  componentWillReceiveProps: function(thisProps) {
    // setting the state of day's items here, so handleDelete can be implemented here and not
    // have to propogate all the way up the hierarchy
    this.setState({
      todayItems: thisProps.dayItems
    });
  },

  deleteApptItem: function(k){
    var allDayApts = this.state.todayItems;
    _.remove(allDayApts, function(ele){
      return ele.id == k;
    })
    this.setState({ todayItems: allDayApts}); //setState
  },

  render: function() {
    var todayDate;
    if (this.props.thisDate > 0) {
      todayDate = this.props.thisDate;
    }
    
    var items = this.props.dayItems;
    var myDay = items.map( function(ele, index) {
    var thisKey = this.props.weekNo+"-"+this.props.dow+"-"+index;
      return (
        <CalItem key={thisKey}
          itemId={ele.id}
          singleItem={ele} 
          onDelete={this.deleteApptItem} />
      ) //return
    }.bind(this)); //forEach

    return (
       <div className="col-1-7">
         <div className="module">
         <div style={{float:'left'}}>{todayDate}</div>
         <span style={{float:'right'}} className="glyphicon glyphicon-plus-sign"></span>
           {myDay}
         </div>
       </div>
    )
  }
})
module.exports = CalDay;