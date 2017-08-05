import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class FixtureBFC extends Component {

  // increaseScore(e) {
  //   this.props.scoreChange();
  // }

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
          <div className="score-bfc"> {this.props.beyondScore} </div>
        </div>
        <Link to="/roster"><button className="score-action-bfc increment"> + </button></Link>
      </div>
    );
  }
}

            // (teamName.slice(0, 9) + "…" ) onClick={this.increaseScore.bind(this)}
