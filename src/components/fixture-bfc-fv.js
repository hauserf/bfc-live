import React, { Component } from 'react';

export default class FixtureBFCFanview extends Component {

  render() {

    const teamName = this.props.teamBFC;
    return (
      <div className="fixture-teams">
        <div className="fixture-bfc">
          <div className="team-bfc">
            {/* {teamName} */}
            {teamName.length > 11
            ?
            teamName.slice(0, 9) + "…"
            :
            teamName}
          </div>
          <div className="score-bfc"> {this.props.beyondScore} </div>
        </div>
        {/* <Link to="/roster"><button className="score-action-bfc increment"> + </button></Link> */}
      </div>
    );
  }
}
