import React, { Component } from 'react';
// import FixtureBFC from './components/fixture-bfc';
// import FixtureOPP from './components/fixture-opp';
import Timer from './timer';
import HighlightsContainer from './highlights-container';

export default class BFCLive extends Component {

  addGoalBFC(e){
    this.props.addGoalBFC();
  }

  addGoalOPP(e){
    this.props.addGoalOPP();
  }

  startStopMatch(e){
    this.props.startStopMatch();
  }

  fastForward(e){
    this.props.fastForward();
  }

  snapGoalsBFC(e){
    this.props.snapGoalsBFC();
  }

  snapGoalsOPP(e){
    this.props.snapGoalsOPP();
  }

  handleSentimentSelected = (sentiment) => {
    this.props.handleSentimentSelected(sentiment);
  }


  render() {

    return (
      <div>
        <Timer
          currentState={this.props.currentState}
          currentTime={this.props.timeLive}
          onOff={this.startStopMatch.bind(this)}
          currentButtonState={this.props.currentButtonState}
          fastForward={this.fastForward.bind(this)}
          handleSentimentSelected={this.handleSentimentSelected.bind(this)}
          sentiment={this.props.sentiment}
          oppScore={this.props.oppScore}
          beyondScore={this.props.beyondScore}
        />
        <HighlightsContainer
          lister={this.props.lister}
          currentButtonState={this.props.currentButtonState}
        />
      </div>
    );
  }
}