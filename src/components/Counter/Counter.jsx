import React from "react";
import { useState } from "react";
import "./Counter.css";

function Counter(props) {
  // let value = props.value;

  const [x, setX] = useState(props.value);

  const minus = () =>{
    setX(x - 1);
  }

// render
  return (
    <div className="count-container">
      <h1 style={{textAlign: "center", fontSize: "2.5rem"}}>{props.name}</h1>
      {/* <button onClick={() => setX(x - 1)}> - </button> */}
      <button style={{marginLeft: "6rem"}} className="btn btn-danger" onClick={minus}> - </button>
      <span className="font"> {x}</span>
      <button className="btn btn-primary" onClick={() => setX(x + 1)}> + </button>
    </div>
  );
}

export default Counter;
