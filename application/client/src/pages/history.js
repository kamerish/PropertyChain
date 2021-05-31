import React from "react";
var httpHandler = require("react-http-client");

function Custom(props){
  
      props["value"].forEach(val => {
        return(
          <h1>{val+"kameerihs"}</h1>
        );
      })
    
}


class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: [],
      recordnumber: "",
    };
  }

  async callAPI() {
    let id = this.state.recordnumber;
    var getResponse ;
    var result = [];
    getResponse = await httpHandler.get("http://localhost:3000/history?"+"id="+id);
    console.log("Api called with value"+ id);
    getResponse.forEach(element => {
      var temp;
      temp = (element["data"]);
      if(temp){
        var values = temp.split(":")[1]
        var values2 = values.split("}")[0];
        console.log(values2.slice(1,values2.length -1));
        result.push(values2.slice(1,values2.length -1));
        
      }
      console.log(result)
      this.setState({res:result})
      // var i = result.length;
      // var final = {};
      // result.forEach(ele => {
      //   final[i] = ele;
      //   i = i-1;
      // })
      // console.log(final);
      
    });
  }

  myChangeHandler = (event) => {
    this.setState({recordnumber: event.target.value});
  }

  render() {
    return (
      <div>
        <h1>Read History of Land Record from Property Chain</h1>
        <form>
          
          <p>Enter Record ID:</p>
          <input type="text" onChange={this.myChangeHandler} />
        </form>
        <button onClick={()=>this.callAPI()}>submitTransaction</button>
        <ol>
          {this.state.res.map((reptile) => (
          <li>{reptile}</li>
      ))}
    </ol>
      </div>
    );
  }
}

export default History;
