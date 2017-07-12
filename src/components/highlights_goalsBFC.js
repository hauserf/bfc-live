import React, { Component } from 'react';


export default class GoalsBFC extends Component {
  render() {

    const lengthOfHalf = 2700;
    const lengthOfGame = 5400;

    return (
      <div className="highlight">
        <div className="timestamp">
          {this.props.currentButtonState === 1 && this.props.timeLive > lengthOfHalf
            ? (lengthOfHalf / 60 + " + " + Math.ceil((this.props.time - lengthOfHalf) / 60) + "'")
            : (this.props.currentButtonState === 3 && this.props.timeLive > lengthOfGame
                ? (lengthOfGame / 60 + " + " + Math.ceil((this.props.time - lengthOfGame) / 60) + "'")
                : (Math.ceil(this.props.time / 60) + "'")
              )
          }
        </div>
      <div className="highlight-event">Goal</div>
      </div>
    );
  }
}

//   <div>Score:{this.props.score}</div>
// <div className="timestamp">{Math.floor(this.props.time / 60) + ":" + ("0" + this.props.time).slice(-2)} </div>
// {Math.ceil(this.props.time / 60)}'
