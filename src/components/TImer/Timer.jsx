import './Timer.css';
import React, { useState } from 'react';

function Timer(props) {
  let value = props.value;

  const [time, setTime] = useState(value);
  const [timekeep, setTimekeep] = useState(null);
  

  const StartTime = () => {
    if (!timekeep) {
      const id = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      setTimekeep(id);
    }
  };

  function secondeToString(time) {
    let days = Math.floor(time / 86400);
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - hours * 3600) / 60);
    let seconds = time - hours * 3600 - minutes * 60;

    return (
      (days < 10 ? '0' + days : days) +
      'd ' +
      (hours < 10 ? '0' + hours : hours) +
      'h ' +
      (minutes < 10 ? '0' + minutes : minutes) +
      'm ' +
      (seconds < 10 ? '0' + seconds : seconds) +
      's '
    );
  }

  const StopTime = () => {
    clearInterval(timekeep);
    setTimekeep(null);
  };

  const ResetTime = () => {
    clearInterval(timekeep);
    setTimekeep(null);
    setTime(0);
  };

  const startAndstop = () => {
    if (!timekeep) {
      StartTime();
      //change color button classname
      
    } else {
      StopTime();

    }
  }

  return (
    <>
      <div className='container-timer' style={{ border: '2px solid black' }}>
      <h1 className='timeHead' style={{ textAlign: 'center',fontSize: '2rem'}}>{props.name}</h1>
        <div className='countTime'>Time: {secondeToString(time)}</div>
        <div className='btn-container'>
        {/* <button className="btn btn-success" onClick={StartTime}>Start</button> */}
        <button className={"btn " + (timekeep ? 'btn-warning' : 'btn-success')} onClick={startAndstop}>{timekeep ? 'Pause' : 'Start'}</button>
        {/* <button className="btn btn-danger" onClick={StopTime}>Stop</button> */}
        <button className="btn btn-danger" onClick={ResetTime}>Reset</button>
        </div>
      </div>
    </>
  );
}

export default Timer;
