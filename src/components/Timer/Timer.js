import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {tick} from  '../../actions/timerActions'
import './Timer.css'


const Timer = () => {
  // const [seconds, setSeconds] = useState(0);
  // const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();
  const isActive = useSelector(state => state.timer.isActive)
  const seconds = useSelector(state => state.timer.seconds)

  // function reset() {
  //   setSeconds(80);
  //   dispatch(setIsActive(false)
  // }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        dispatch(tick())
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="app">
      <div className="time">
        {seconds}s
      </div>
    </div>
  );
};

export default Timer;