var Header = React.createClass({
  render : function(){
    return (
      <h1 className="title">{this.props.text}</h1>
    );
  }
});

var SearchBar = React.createClass({
  getInitialState: function(){
    return {searchKey : ''};
  },
  searchHandler : function(event){
    var searchKey = event.target.value;
    this.setState({searchKey : searchKey});
    this.props.searchHandler(searchKey);
  },
  render: function(){
      return (
        <input type="search" value={this.state.symbol} onChange={this.searchHandler}/>
      );
    }
});

var EmployeeList = React.createClass({
  render: function() {

    var items = this.props.employees.map(function(employee){
      return (
        <EmployeeListItem key={employee.id} employee={employee}/>
      );
    })
    return (
      <ul>
        {items}
      </ul>
    );
  }
});

var EmployeeListItem = React.createClass({
  render: function(){
    return (
      <li>
        <a href={'#employees/'+this.props.employee.id}>
          {this.props.employee.firstName} {this.props.employee.lastName}
        </a>
      </li>
    );
  }
});

var HomePage  = React.createClass({
  searchHandler : function(key){
    this.props.service.findByName(key).done(function(result) {
        this.setState({searchKey: key, employees: result});
    }.bind(this));
  },
  render:function(){
    var employees = [
      {id: 1, firstName : 'Maroof' , lastName : 'Ahmad'},
      {id : 2,firstName : 'Samuel' , lastName : 'Jackson'},
      {id : 3,firstName : 'Angular', lastName : 'React'}
    ];
    return(
      <div>
        <Header text="Employee Directory"/>
        <SearchBar searchHandler={this.searchHandler}/>
        <EmployeeList employees={employees}/>
      </div>
    );
  }
});


ReactDOM.render(
  <HomePage/>,
  document.getElementById('mydiv')

);
