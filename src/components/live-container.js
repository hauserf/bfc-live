import React, { Component } from 'react';
import Highlight from './highlight.js';
import TimerEvent from './timer-event.js'
import GameEvents from './game-events.js'





class LiveContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      goalsArr: [],
      highlights: [],
      container: []
    }
  }



  render() {
    // const key = (this.props.buttonEvent * 80).toString()

    const timerIterator = this.props.buttonEvent;
    const timerEvents = this.props.timerEvents;
    const key = this.props.score;

    const triggeredHighlights = () => {
      if (this.props.score > 0 ){
        this.state.highlights.push(<Highlight key={key} gameEvents={this.props.gameEvents}/>);
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
            buttonEvent={this.props.buttonEvent}
            key={timerEvents[timerIterator].timerEvent.toString()}
        />);
      };
        return (
          this.state.highlights.map(() => {
            return (
              <TimerEvent />
            )
          })
        )
    }

    // triggerYC = () => {
    //   this.state.highlights.push(
    //     <GameEvents
    //       key={this.props.gameEvents[3].toString()}
    //       gameEvents={this.props.gameEvents}
    //     />
    //   )
    //   return (
    //     this.state.highlights
    //   )
    // }

    triggeredBtnEvents();
    triggeredHighlights();



    return (

      <div className="highlights-container">
        <div className="highlights-intro">
          <h1>Highlights</h1>
          <button className="btn btn-info" onClick={() => {this.triggerYC.bind(this)}}> YC </button>
          <button className="btn btn-info px-2"> RED </button>
          <button className="btn btn-info"> PEN </button>
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
