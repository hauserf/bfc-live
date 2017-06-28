import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Fixture from './components/fixture'
import LiveContainer from './components/live-container'
import Timer from './components/timer'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import './App.css';

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
    console.log(buttonEvent);
  }

  render() {
    return (
      <div className="bfc-live">
        <div className="fixture">
          <Fixture
            score={this.state.score}
            scoreChange={(score) => this.setState({score})}
            />
        </div>
        <Timer
          buttonEvent={this.state.buttonEvent}
          triggeredBtnEvents={this.triggeredBtnEvents.bind(this)}
          timerChange={(secondsElapsed) => this.setState({secondsElapsed})}
          secondsElapsed={this.state.secondsElapsed}
          timeStamp={this.state.laps}
          lastClearedIncrementer={this.state.lastClearedIncrementer}
        />
        <LiveContainer
          score={this.state.score}
          buttonEvent={this.state.buttonEvent}
          />

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
