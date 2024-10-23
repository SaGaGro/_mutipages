import React, { useEffect, useState } from "react";
import Variable from "../Variable/Variable";
import "./Add.css";

function Add({ aValue, bValue, name, type }) {

  if (type === 'int') {

    const [a, setA] = useState(0);
    const [b, setB] = useState(0);

    useEffect(() => {
      setA(aValue || 0);
      setB(bValue || 0);
    }, [aValue, bValue]);

    return (
      <>
          <div className="Add-container">
            <div className="head">
            <h1 className="head-Add">{name}</h1>
            </div>
            <div className="sum-container">
              <span className="A btn btn-primary"> A = {a}</span>
              <span className="B btn btn-primary"> B = {b}</span>
              <span className="sum btn btn-warning"> A+B = {a + b}</span>
            </div>
            <div className="var-wrapper">
              <Variable type={"int"} name={"A"} value={a} setValue={setA}></Variable>
              <Variable type={"int"} name={"B"} value={b} setValue={setB}></Variable>
            </div>
          </div>
      </>
    );
  }
}

export default Add;
