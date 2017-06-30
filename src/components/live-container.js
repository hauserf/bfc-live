import React, { Component } from 'react';
import Highlight from './highlight.js';
import TimerEvent from './timer-event.js'






class LiveContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      goalsArr: [],
      highlights: [],

    }
  }

  render() {

    // const key = (this.props.buttonEvent * 80).toString()

    const timerIterator = this.props.buttonEvent
    const timerEvents = this.props.timerEvents
    const key = this.props.score + 100

    const triggeredHighlights = () => {
      if (this.props.score > 0 ){
        this.state.highlights.push(<Highlight key={key}/>);
      };
        return (
          this.state.highlights
        )
    };

    const triggeredBtnEvents = () => {

      if (this.props.buttonEvent > 0 ){
        this.state.highlights.push(
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
