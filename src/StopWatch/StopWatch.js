import Button from './Button.js';
import styles from './StopWatch.module.scss'
import React, { useState, useEffect } from 'react';


const Stopwatch = () => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (running) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [running]);

  const handleStart = () => {
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setTime(0);
  };

  const formatTime = () => {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
  };

  const pad = (value, length = 2) => {
    return value.toString().padStart(length, '0');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Stopwatch</h1>
      <p className={styles.time}>Time: {formatTime()}</p>
      <div className={styles.buttons}>
      <Button onClick={handleStart}>Start</Button>
      <Button onClick={handleStop}>Stop</Button>
      <Button onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
};

export default Stopwatch;
