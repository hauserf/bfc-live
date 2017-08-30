import React, { Component } from 'react';
import TimeCounter from './timecounter';
// import SentimentBox from './sentiment-box';
import StartButton from './timer-start-button';
import ExtraMinsButton from './timer-extramins-button';
import GameEnded from './game-ended';


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
    return (
      <div className="stopwatch">
        <TimeCounter time={this.props.currentTime}/>
        {this.props.currentButtonState < 4
        ?
          <div>
            <StartButton
              currentButtonState={this.props.currentButtonState}
              handleClicker={this.handleClicker.bind(this)}
            />
            <ExtraMinsButton
              fastForward={this.props.fastForward.bind(this)}
            />
          </div>
        :
          <GameEnded
            handleSentimentSelected={this.handleSentimentSelected}
            oppScore={this.props.oppScore}
            beyondScore={this.props.beyondScore}
          />}
      </div>
    );
  }
}
