import React, { Component } from 'react';

export default class FixtureBFC extends Component {

  increaseScore(e) {
    this.props.scoreChange();
  }

  render() {

    const teamName = this.props.teamBFC;
    return (
      <div className="fixture-teams">
        <div className="fixture-bfc">
          <div className="team-bfc">
            {teamName.length > 11
            ?
            teamName.slice(0, 9) + "…"
            :
            teamName}
          </div>
          <div className="score-bfc"> {this.props.currentBFCScore} </div>
        </div>
        <button className="score-action-bfc increment" onClick={this.increaseScore.bind(this)}> + </button>
      </div>
    );
  }
}

            // (teamName.slice(0, 9) + "…" )
