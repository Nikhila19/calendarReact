var React = require('react');
var ReactDOM = require('react-dom');
var moment = require('moment');

var CalWeek = require('./CalWeek');

var MonthInterface = React.createClass({
  getInitialState: function() {
    var today = moment();
    var months = [ "January", "February", "March", "April", "May", "June",
                   "July", "August", "September", "October", "November", "December" ];

    return { 
      resultSet: [],
      numOfWeeksInMonth: today.endOf('month').week() - today.startOf('month').week() + 1,
      firstDayOfMonth: today.startOf('month').day(),
      lastDateOfMonth: today.endOf('month').date(),
      mon: today.month(),
      monthName: months[today.month()],
      myAppointments: []
    } //return
  }, //getInitialState

  componentDidMount: function() {
    $.ajax("/js/data.json")
    .done( function(result) {
        var temp = result;
        this.setState({
          myAppointments: temp
        }) //setState
    }.bind(this))
    .fail( function(err) {
      console.log("error= " + err);
    })
  }, // componentDidMount

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    var temp = this.state.weekNum;
    var allItems = this.state.myAppointments;
    var filtered = [];

    (function mappingFunction(week) {
      while (week < this.state.numOfWeeksInMonth) {
        var filteredItems = jQuery.grep(allItems, function(ele, index){
          return (parseInt(ele.weekNum) == week)
        });

        var firstDateOfCurrentWeek = 1 + (7 * week) - this.state.firstDayOfMonth;
        filtered.push( <CalWeek key={week}
          weeklyItems={filteredItems}
          weekNum={week} 
          firstDateOfWeek={firstDateOfCurrentWeek} 
          lastDateOfMonth={this.state.lastDateOfMonth} />)

        week += 1;

      } //while
      return filtered;

    }.bind(this))(0); // function
    
    //

    // var filtered = temp.map( function(numOfWeek) {
    //   var filteredItems = jQuery.grep(allItems, function(ele, index){
    //     return (parseInt(ele.weekNum) == numOfWeek)
    //   })
    //   return (
    //     <CalWeek key={numOfWeek}
    //     weeklyItems={filteredItems}
    //     weekNum={numOfWeek} />
    //   )
    // }.bind(this) ) 

    return (
      <div>
      <header>
        <nav className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">{this.state.monthName}</a>
            <span data-next-month={this.state.mon + 1} className="glyphicon glyphicon-chevron-right"></span>
          </div>
        </div>
        </nav>
      </header>

      <div className="grid grid-header">
        <div className="col-1-7">
          <div className="header-module">
            <h3 className="header-item">Sunday</h3>
          </div>
        </div>
        <div className="col-1-7">
          <div className="header-module">
            <h3 className="header-item">Monday</h3>
          </div>
        </div>
        <div className="col-1-7">
          <div className="header-module">
            <h3 className="header-item">Tuesday</h3>
          </div>
        </div>
        <div className="col-1-7">
          <div className="header-module">
            <h3 className="header-item">Wednesday</h3>
          </div>
        </div>
        <div className="col-1-7">
          <div className="header-module">
            <h3 className="header-item">Thursday</h3>
          </div>
        </div>
        <div className="col-1-7">
          <div className="header-module">
            <h3 className="header-item">Friday</h3>
          </div>
        </div>
        <div className="col-1-7">
          <div className="header-module">
            <h3 className="header-item">Saturday</h3>
          </div>
        </div>
      </div>

        {filtered}
      </div>
    )

  } //render

})



ReactDOM.render(
 <MonthInterface />,
  document.getElementById('calendarmonth')
 )