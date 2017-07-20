import React, { Component } from 'react';
import Timecounter from './subcomponents/timecounter';
import {TimerEvents} from '../data/timer-events'

export default class Timer extends Component {

  fastForward(e){
    this.props.fastForward();
  }

  handleClicker(e){
    this.props.onOff();
  }

  snapShot(e){
    this.props.snap();
  }

  render() {
    const buttonName = TimerEvents[this.props.currentButtonState].btnName
    return (
      <div className="stopwatch">
        <Timecounter time={this.props.currentTime}/>
        {this.props.currentButtonState < 4
        ?
        <div>
          <button className="start-stop" onClick={this.handleClicker.bind(this)}>{buttonName}</button>
          <button
            className="fwd-bwd"
            id="buttonPlusEight"
            onClick={this.fastForward.bind(this)}>
            +8
          </button>
        </div>
        : <div className="game-ended text-danger">Game ended</div>}

      </div>
    );
  }
}

/* <button className="stop-stop" onClick={this.snapshot.bind(this)}>Capture Moment</button> */
