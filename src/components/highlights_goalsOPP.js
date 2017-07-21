import React, { Component } from 'react';

export default class GoalsOPP extends Component {
  render() {

    const lengthOfHalf = this.props.lengthOfHalf;
    const lengthOfGame = this.props.lengthOfGame;

    return (
      <div className="highlight">
        <div className="highlight-event-opp">Goal</div>
        <div className="timestamp-opp">
          {this.props.currentButtonState === 1 && this.props.timeLive > lengthOfHalf
            ? (lengthOfHalf / 60 + " + " + Math.ceil((this.props.timeLive - lengthOfHalf) / 60) + "'")
            : (this.props.currentButtonState === 3 && this.props.timeLive > lengthOfGame
                ? (lengthOfGame / 60 + " + " + Math.ceil((this.props.timeLive - lengthOfGame) / 60) + "'")
                : (Math.ceil(this.props.timeLive / 60) + "'")
              )
          }
        </div>
      </div>
    );
  }
}

//   <div>Score:{this.props.score}</div>
// <div className="timestamp">{Math.floor(this.props.time / 60) + ":" + ("0" + this.props.time).slice(-2)} </div>
