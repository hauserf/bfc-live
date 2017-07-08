import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Fixture from './components/fixture'
import LiveContainer from './components/live-container'
import Timer from './components/timer'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import './App.css';

var gameEvents = ["Goal", "Yellow Card", "Red Card", "Penalty Missed"]

var timerEvents = [
  {
    key: 1000,
    btnName: "Start Game",
    timerEvent: "Waiting for Kickoff"
  },
  {
    key: 1001,
    btnName: "End 1st Half",
    timerEvent: "Game On! #WeAreBeyond"
  },
  {
    key: 1002,
    btnName: "Start 2nd Half",
    timerEvent: "First Half Ended"
  },
  {
    key: 1003,
    btnName: "End 2nd Half",
    timerEvent: "Second Half Begins"
  },
  {
    key: 1004,
    btnName: "Game Ended",
    timerEvent: "Second Half Ended"
  },

];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      secondsElapsed: 0,
      laps: [],
      lastClearedIncrementer: null,
      buttonEvent: 0
    }
  }

  triggeredBtnEvents(buttonEvent) {
    this.setState({buttonEvent});
  }

  updateScore(score, getGoalMins) {
    this.setState({score});
    }

  handleLabClick(laps) {
    this.setState({
      laps
    })
  }

  // handleLabClick(laps) {
  //   this.setState({
  //     laps: this.state.laps.concat([this.state.secondsElapsed])
  //   })
  // }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 "></div>
          <div className="col-sm-4 bfc-live">
              <div className="fixture">
                <Fixture
                  score={this.state.score}
                  scoreChange={this.updateScore.bind(this)}
                  buttonEvent={this.state.buttonEvent}
                  />
              </div>
                <Timer
                  buttonEvent={this.state.buttonEvent}
                  triggeredBtnEvents={this.triggeredBtnEvents.bind(this)}
                  // timerChange={(secondsElapsed) => this.setState({secondsElapsed})}
                  secondsElapsed={this.state.secondsElapsed}
                  timeStamp={this.state.laps}
                  lastClearedIncrementer={this.state.lastClearedIncrementer}
                  timerEvents={this.props.timerEvents}
                  handleLabClick={this.handleLabClick}

                />
                <LiveContainer
                  score={this.state.score}
                  buttonEvent={this.state.buttonEvent}
                  timerEvents={this.props.timerEvents}
                  gameEvents={this.props.gameEvents}
                />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App timerEvents={timerEvents} gameEvents={gameEvents} />, document.getElementById('root'));
