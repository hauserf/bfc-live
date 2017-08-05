import React, { Component } from 'react';


// handlePlayerGoals = (id) => {
//   const player = findById(id, this.state.roster)
//   const roster = this.state.roster;
//   const playerGoals = roster[roster.indexOf(player)].goals;
//   updatePlayer(roster, playerGoals.push(this.state.timeLive))
//   console.log(roster[roster.indexOf(player)].goals);
//   this.setState({ roster })
//   this.addGoalBFC();
//   this.snapGoalsBFC(player);
// }


export default class GoalsBFC extends Component {
  render() {
    const lengthOfHalf = this.props.lengthOfHalf;
    const lengthOfGame = lengthOfHalf * 2;
    const scorer = this.props.scorer
    const playerName = scorer.firstName + " " + scorer.lastName

    return (
      <div className="highlight">
        <div className="timestamp">
          {this.props.currentButtonState === 1 && this.props.timeLive > lengthOfHalf
            ? (lengthOfHalf / 60 + " + " + Math.ceil((this.props.timeLive - lengthOfHalf) / 60) + "'")
            : (this.props.currentButtonState === 3 && this.props.timeLive > lengthOfGame
                ? (lengthOfGame / 60 + " + " + Math.ceil((this.props.timeLive - lengthOfGame) / 60) + "'")
                : (Math.ceil(this.props.timeLive / 60) + "'")
              )
          }
        </div>
        <div className="highlight-icon">
          {this.props.event === "goal"
           ? <img className="icon-size" src="soccer-ball.png" alt="icon8 - goal" />
           : this.props.event === "assist"
             ?  <img className="icon-size" src="gift.png" alt="icon8 - gift" />
             : this.props.event === "yc"
                ? <img className="icon-size" src="yellowCard.png" alt="icon8 - yellowCard" />
                : this.props.event === "yy"
                   ? <img className="icon-size" src="yellowRed.png" alt="icon8 - yellowRed" />
                   : this.props.event === "rc"
                      ? <img className="icon-size" src="redCard.png" alt="icon8 - redCard" />
                      : null

          }
        </div>
        <div className="highlight-event">
          {playerName}
        </div>
      </div>
    );
  }
}

//   <div>Score:{this.props.score}</div>
// <div className="timestamp">{Math.floor(this.props.time / 60) + ":" + ("0" + this.props.time).slice(-2)} </div>
// {Math.ceil(this.props.time / 60)}'
