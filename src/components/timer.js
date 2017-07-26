import React, { Component } from 'react';
import Timecounter from './subcomponents/timecounter';
import {TimerEvents} from '../data/timer-events';
import SentimentBox from './sentiment-box';



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

  handleSentimentSelected = (sentiment) => {
    this.props.handleSentimentSelected(sentiment);
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
        : (
            <div>
              <div>
                <div className="game-ended text-danger">Game ended</div>
              </div>
              <div>
                <SentimentBox
                  handleSentimentSelected={this.handleSentimentSelected}
                  oppScore={this.props.oppScore}
                  beyondScore={this.props.beyondScore}
                />
              </div>
            </div>
          )
        }

      </div>
    );
  }
}
