import React from "react";
var httpHandler = require("react-http-client");

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: "",
      recordnumber: "",
      recordname:"",
    };
  }

  async callAPI() {
    let id = this.state.recordnumber;
    let name = this.state.recordname;
    const getResponse = await httpHandler.get("http://localhost:3000/update?"+"id="+id+"&name="+name);
    console.log("Api called with value"+ id);
    console.log(getResponse);
    this.setState({res:getResponse["value"]});
  }

  myChangeHandlerid = (event) => {
    this.setState({recordnumber: event.target.value});
  }
  myChangeHandlername = (event) => {
    this.setState({recordname: event.target.value});
  }

  render() {
    return (
      <div>
        <h1>Create Land Record in  Property Chain</h1>
        <form>
          <p>Enter Record ID:</p>
          <input type="text" onChange={this.myChangeHandlerid} />
          <p>Enter New Record Name:</p>
          <input type="text" onChange={this.myChangeHandlername} />
        </form>
        <button onClick={()=>this.callAPI()}>submitTransaction</button>
        <h1>{this.state.res}</h1>
      </div>
    );
  }
}

export default Create;
