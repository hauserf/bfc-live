import React, { Component } from 'react';
import TimeCounter from './timecounter';
// import SentimentBox from './sentiment-box';
import StartButton from './timer-start-button';
import ExtraMinsButton from './timer-extramins-button';
import GameEnded from './game-ended';


export default class Timer extends Component {

  fastForward(mins){
    console.log("min: ", mins);
    this.props.fastForward(mins);
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
            <ExtraMinsButton
              fastForward={this.props.fastForward.bind(this)}
              name={"-1"}
              value={-1}
            />
            <ExtraMinsButton
              fastForward={this.props.fastForward.bind(this)}
              name={"+5"}
              value={5}
            />
            <StartButton
              currentButtonState={this.props.currentButtonState}
              handleClicker={this.handleClicker.bind(this)}
              applang={this.props.applang}
            />
          </div>
        :
          <GameEnded
            handleSentimentSelected={this.handleSentimentSelected}
            oppScore={this.props.oppScore}
            beyondScore={this.props.beyondScore}
            applang={this.props.applang}
          />}
      </div>
    );
  }
}
