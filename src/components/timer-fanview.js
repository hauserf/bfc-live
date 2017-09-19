import React, { Component } from 'react';
import TimeCounter from './timecounter';

export default class TimerFanview extends Component {

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
      </div>
    );
  }
}
