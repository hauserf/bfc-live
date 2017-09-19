import React, { Component } from 'react';
// import FixtureBFC from './components/fixture-bfc';
// import FixtureOPP from './components/fixture-opp';
import TimerFanview from './timer-fanview';
import HighlightsContainer from './highlights-container';
import FixtureFanview from './fixture-fanview';

export default class Fanview extends Component {

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
        <FixtureFanview
          teamBFC={this.props.teamBFC}
          beyondScore={this.props.beyondScore}
          addGoalBFC={this.addGoalBFC.bind(this)}
          teamOPP={this.props.teamOPP}
          oppScore={this.props.oppScore}
          addGoalOPP={this.addGoalOPP.bind(this)}
        />
        <TimerFanview
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
