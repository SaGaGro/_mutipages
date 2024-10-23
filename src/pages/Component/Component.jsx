import React from 'react'
import Add from '../../components/Add/Add'
import Counter from '../../components/Counter/Counter'
import Timer from '../../components/TImer/Timer'
import Temperature from '../../components/Temperature/Temperature'
import './Component.css'

function Component() {
    return (
        <div className='component-container'>
            <h3 style={{ textAlign: "center" }} className=''>REACT COMPONENT</h3>
            <div className='time-count-add-app'>
                <div className='time-count-app'>
                    <Counter name={"Counter1"} value={50}></Counter>
                    <Timer name={"Timer1"} value={60}></Timer>
                </div>

                <div className='add-app'>
                    <Add name={"ADD1"} aValue={6} bValue={5} type={"int"}></Add>
                </div>
            </div>
            <Temperature
          name={"Temperatures"}
          Celsius={25}
          type={"float"}
        ></Temperature>
        <div className="footer-component" style={{marginTop: "0.1rem"}}>
          <h2 style={{ textAlign: "center", backgroundColor: "black", color: "white" }}> นาย คุณาธิป อู่ทอง รหัส 66033050</h2>
        </div>
        </div>
    )
}

export default Component