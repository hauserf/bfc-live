import React, { Component } from 'react';

export default class FixtureOPP extends Component {

  increaseScore(e) {
    this.props.scoreChange();
  }

  render() {

    const teamName = this.props.teamOPP.toUpperCase();

    return (
    <div>
        <div>
          <div className="fixture-opp">
            <div className="score-opp"> {this.props.oppScore} </div>
            <div className="team-opp">
              {teamName.length > 11
              ?
              teamName.slice(0, 9) + "…"
              :
              teamName}
            </div>
          </div>
            <button className="score-action-opp increment" onClick={this.increaseScore.bind(this)}> + </button>

        </div>
      </div>
    );
  }
}
