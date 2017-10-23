import React from 'react';
// import {TimerEvents} from '../data/timer-events';
import { AppLang } from '../data/applang';

const StartButton = (props) => {

  const applang = props.applang;
  // const buttonName = TimerEvents[props.currentButtonState].btnName;
  const buttonName = AppLang.timerEvents[props.currentButtonState].btnName[applang];
  const handleClicker = props.handleClicker.bind(this);

  return (
    <button className="start-stop" onClick={handleClicker}>{buttonName}</button>
  );
}

export default StartButton;
