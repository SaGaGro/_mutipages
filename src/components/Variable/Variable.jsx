import React from "react";
import "./Virable1.css";

function Variable({ name, value, setValue,type }) {
    return (
        <>
            <div className="var-container">
                <div className="var-border">
                    <div className="var-name">{name + ":"}</div>
                    {setValue && (
                        <button className="btn btn-danger" onClick={() => setValue(value - 1)}> - </button>
                    )}
                    <span><p className="value-border">{type && type === 'int' ? value : value.toFixed(2)}</p></span>
                    {setValue && (
                        <button className="btn btn-primary" onClick={() => setValue(value + 1)}> + </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Variable;
