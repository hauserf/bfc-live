import React,  { Component } from 'react';
// import PropTypes from 'prop-types';
// import PlayerName from './player-name';
//import PlayerGameStats from './player-game-stats';
//import PlayerPerformanceStats from './player-performance-stats';
import Fixture from './fixture';
import Timer from './timer';
import { Link } from 'react-router-dom';
//import { Alert } from 'react-bootstrap';



export default class TeamStats extends Component {

  render() {


    return (
        <div >
          <Link to="/roster"><div className="nav-banner-top"><img alt="< Back" /> </div></Link>
          {/* <p className="text-warning pull-right mx-4">...coming soon</p> */}
          <Fixture
            teamBFC={this.props.teamBFC}
            beyondScore={this.props.beyondScore}
            addGoalBFC={this.addGoalBFC}
            teamOPP={this.props.teamOPP}
            oppScore={this.props.oppScore}
            addGoalOPP={this.addGoalOPP}
          />
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

          <h1 className="setting-h"> Beyond FC</h1>

          <h4 className="roster-title"> Health & Performance </h4>

        </div>
    );
  };
}
