import React, { useState, useEffect } from 'react';
import './Animation.css'; // Ensure this CSS file is in the same directory

const Animation = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [running, setRunning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [rotationDirection, setRotationDirection] = useState(1);
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [vx, setVx] = useState(Math.floor(Math.random() * 11) + 5);
  const [vy, setVy] = useState(Math.floor(Math.random() * 11) + 5);
  const [ballImage, setBallImage] = useState('/_mutipages/Ball/red.png');
  const [selectedBall, setSelectedBall] = useState(null);
  const ballSize = 150;
  const fieldWidth = 1000;
  const fieldHeight = 600;
  const maxLeft = fieldWidth - ballSize - 2;
  const maxTop = fieldHeight - ballSize - 2;

  const ballImages = {
    basketball: "/_mutipages/Ball/ดาวน์โหลด.jpg",
    red: "/_mutipages/Ball/red.png",
    football: "/_mutipages/Ball/football.jpg",
    volleyball: "/_mutipages/Ball/volleyball.jpg",
    cartoon: "/_mutipages/Ball/jerry.jpg",
    logo: "/_mutipages/Ball/logo.png",
    nonthee: "/_mutipages/Ball/IMG_2326.jpg",
  };

  const randomizeRotationDirection = () => {
    setRotationDirection(Math.random() > 0.5 ? 1 : -1);
  };

  const randomizeSpeed = () => {
    setVx(Math.floor(Math.random() * 11) + 5);
    setVy(Math.floor(Math.random() * 11) + 5);
    setRotationSpeed(Math.floor(Math.random() * 6) + 1);
  };

  const run = () => {
    setRunning((prevRunning) => !prevRunning); // Toggle running state
  };

  const calc = () => {
    setX((prevX) => {
      if (goRight) {
        if (prevX >= maxLeft) {
          setGoRight(false);
          randomizeSpeed();
          randomizeRotationDirection();
          return prevX;
        }
        return prevX + vx;
      } else {
        if (prevX < 0) {
          setGoRight(true);
          randomizeSpeed();
          randomizeRotationDirection();
          return prevX;
        }
        return prevX - vx;
      }
    });

    setY((prevY) => {
      if (goDown) {
        if (prevY >= maxTop) {
          setGoDown(false);
          randomizeSpeed();
          randomizeRotationDirection();
          return prevY;
        }
        return prevY + vy;
      } else {
        if (prevY < 0) {
          setGoDown(true);
          randomizeSpeed();
          randomizeRotationDirection();
          return prevY;
        }
        return prevY - vy;
      }
    });

    setRotation((prevRotation) => (prevRotation + rotationSpeed * rotationDirection) % 360);
  };

  const process = () => {
    if (running) {
      calc();
    }
  };

  useEffect(() => {
    const interval = setInterval(process, 25);
    return () => clearInterval(interval);
  }, [running, goRight, goDown, vx, vy, rotationDirection, rotationSpeed]);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === " ") {
        run(); // Call the run function to toggle running state
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  useEffect(() => {
    setRunning(true); // Automatically start the animation
  }, []);

  const changeBallImage = (image, name) => {
    setBallImage(image);
    setSelectedBall(name);
  };

  return (
    <div id="container">
      <div id="field" style={{ width: fieldWidth, height: fieldHeight }}>
        <div
          id="ball"
          style={{
            left: x,
            top: y,
            width: ballSize,
            height: ballSize,
            transform: `rotate(${rotation}deg)`,
            backgroundImage: `url(${ballImage})`,
          }}
        ></div>
      </div>
      <div id="control">
        <button id="run" onClick={run} className={`btn ${running ? 'btn-warning' : 'btn-success'}`}>
          {running ? 'STOP' : 'RUN'}
        </button>
        <button id="none" className={`btn btn-outline-warning ${selectedBall === null ? 'active' : ''}`} onClick={() => changeBallImage('', null)}>NONE</button>
        <button id="basketball" className={`btn btn-outline-primary ${selectedBall === 'basketball' ? 'active' : ''}`} onClick={() => changeBallImage(ballImages.basketball, 'basketball')}>BASKETBALL</button>
        <button id="football" className={`btn btn-outline-primary ${selectedBall === 'football' ? 'active' : ''}`} onClick={() => changeBallImage(ballImages.football, 'football')}>FOOTBALL</button>
        <button id="volleyball" className={`btn btn-outline-primary ${selectedBall === 'volleyball' ? 'active' : ''}`} onClick={() => changeBallImage(ballImages.volleyball, 'volleyball')}>VOLLEYBALL</button>
        <button id="cartoon" className={`btn btn-outline-primary ${selectedBall === 'cartoon' ? 'active' : ''}`} onClick={() => changeBallImage(ballImages.cartoon, 'cartoon')}>CARTOON</button>
        <button id="logo" className={`btn btn-outline-primary ${selectedBall === 'logo' ? 'active' : ''}`} onClick={() => changeBallImage(ballImages.logo, 'logo')}>LOGO</button>
        <button id="nonthee" className={`btn btn-outline-danger ${selectedBall === 'nonthee' ? 'active' : ''}`} onClick={() => changeBallImage(ballImages.nonthee, 'nonthee')}>NONTHEE</button>
      </div>
    </div>
  );
};

export default Animation;
