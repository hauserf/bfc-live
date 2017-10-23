import React, { Component } from 'react';
// import {TimerEvents} from '../data/timer-events';
import { AppLang } from '../data/applang';


export default class TimerState extends Component {

  render() {

    const applang = this.props.applang;
    const timerStateEvent = AppLang.timerEvents[this.props.currentButtonState + 1].timerEvent[applang];
    // const timerStateEvent = TimerEvents[this.props.currentButtonState + 1].timerEvent;

    return (
      <div className="highlight">
        <div className="timer-event">
          {timerStateEvent}
          {this.props.currentButtonState === 1 || this.props.currentButtonState === 3
            ? (" (" + (Math.ceil(this.props.timeLive / 60)) + "')")
            : null
          }
        </div>
      </div>
    )
  }
}
