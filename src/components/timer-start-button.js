import React from 'react';
import {TimerEvents} from '../data/timer-events';

const StartButton = (props) => {

  const buttonName = TimerEvents[props.currentButtonState].btnName;
  const handleClicker = props.handleClicker.bind(this);

  return (
    <button className="start-stop" onClick={handleClicker}>{buttonName}</button>
  );
}

export default StartButton;
