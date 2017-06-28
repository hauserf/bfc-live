import React, { Component } from 'react';


class TimerEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {



    return (
      <div className="highlight">
        <div className="event text-center"> {this.props.timerEvent} </div>
      </div>
    )
  }
}

export default TimerEvent;
