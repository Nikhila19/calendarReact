var React = require('react');
var CalDay = require('./CalDay');

var CalWeek = React.createClass({
  render: function() {
    var weekItems = this.props.weeklyItems;
    var number = this.props.weekNum;

    var days = [0,1,2,3,4,5,6];
    var filteredWeekItems;
    var thisDate = this.props.firstDateOfWeek;
    var lastDate = this.props.lastDateOfMonth;

    var filtered = days.map(function(ele) {
      filteredWeekItems = $.grep(weekItems, function(item){
        return (item.dayNum == ele)
      });
      var props = {
        key : number+"-"+ele,
        thisDate : (thisDate > lastDate ? null : thisDate++),
        dayItems : filteredWeekItems
      }
      return (
        <CalDay {...props} />
      )

    });

    return (
      <div className="grid grid-pad" >
      {filtered}
      </div>
    )
  }
});

module.exports=CalWeek;