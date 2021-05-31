import React from "react";
var httpHandler = require("react-http-client");

class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: "",
      recordnumber: "",
    };
  }

  async callAPI() {
    let id = this.state.recordnumber;
    const getResponse = await httpHandler.get("http://localhost:3000/delete?"+"id="+id);
    console.log("Api called with value"+ id);
    console.log(getResponse);
    this.setState({res:getResponse["value"]});
  }

  myChangeHandler = (event) => {
    this.setState({recordnumber: event.target.value});
  }

  render() {
    return (
      <div>
        <h1>Delete Land Record from  Property Chain</h1>
        <form>
          
          <p>Enter Record ID:</p>
          <input type="text" onChange={this.myChangeHandler} />
        </form>
        <button onClick={()=>this.callAPI()}>submitTransaction</button>
        <h1>{this.state.res}</h1>
      </div>
    );
  }
}

export default Delete;
