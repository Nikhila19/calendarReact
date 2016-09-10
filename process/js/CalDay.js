var React = require('react');
var _ = require('lodash');

var CalItem = require('./CalItem')

var CalDay = React.createClass({
  componentWillReceiveProps: function(thisProps) {
    console.log("props in componentWillReceiveProps= "+ JSON.stringify(thisProps));
    this.setState({
      todayItems: thisProps.dayItems
    });
  },

  deleteApptItem: function(item){
console.log("have to delete item ", item);

    var allDayApts = this.state.todayItems;
    console.log("allDayApts= "+JSON.stringify(allDayApts));
    var newDayApts = _.without(allDayApts, item);
    console.log("newDayApts= "+newDayApts);
    this.setState({
      todayItems: newDayApts
    }); //setState
  },

  render: function() {
    var todayDate;
    if (this.props.thisDate > 0) {
      todayDate = this.props.thisDate;
    }
    
    var items = this.props.dayItems;
    var myDay = items.map( function(ele, index) {
      return (
        <CalItem key={ele.id}
          singleItem={ele} 
          whichItem={ele} 
          onDelete={this.deleteApptItem} />
      ) //return
    }.bind(this)); //forEach

    return (
       <div className="col-1-7">
         <div className="module">
         <div style={{float:'left'}}>{todayDate}</div>
           {myDay}
         </div>
       </div>
    )
  }
})
module.exports = CalDay;