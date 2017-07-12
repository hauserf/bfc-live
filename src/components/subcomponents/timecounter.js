import React, { Component } from 'react';


export default class Timecounter extends Component {
  render() {
    return (
      <div className="stopwatch-time">
        {("0" + Math.floor(this.props.time / 60)).slice(-2) + ":" + ("0" + this.props.time % 60).slice(-2)}
      </div>
    );
  }
}
