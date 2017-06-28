import React, { Component } from 'react';
import Highlight from './highlight.js';
import TimerEvent from './timer-event.js'



const timerEvents = [
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


class LiveContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      highlights: [],
    }
  }

  render() {

    const key = -this.props.score
    const timerIterator = this.props.buttonEvent

    const triggeredHighlights = () => {
      if (this.props.score > 0 ){
        this.state.highlights.unshift(<Highlight key={key}/>);
      };
        return (
          this.state.highlights
        )
    };

    const triggeredBtnEvents = () => {
      if (this.props.buttonEvent > 0 ){
        this.state.highlights.unshift(
          <TimerEvent
            timerEvent={timerEvents[timerIterator].timerEvent}
            key={timerEvents[timerIterator].key.toString()}
            buttonEvent={this.props.buttonEvent}
        />);
      };
        return (
          this.state.highlights
        )
    }
    triggeredBtnEvents();
    triggeredHighlights();



    return (
      <div className="highlights-container">
        <div className="highlights-intro">
          <h1>Highlights</h1>
        </div>
        <div className="highlights">
          <ul className="list-unstyled">
            {this.state.highlights}

          </ul>
        </div>
      </div>
    )
  }
}

export default LiveContainer;
