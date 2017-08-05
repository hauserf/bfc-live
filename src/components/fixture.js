import React, { Component } from 'react'
import FixtureBFC from './fixture-bfc';
import FixtureOPP from './fixture-opp';


export default class Fixture extends Component {

  addGoalBFC(e) {
    this.props.addGoalBFC();
  }

  addGoalOPP(e) {
    this.props.addGoalOPP();
  }

  render() {
    return(
        <div className="fixture">
          <div className="fixture-teams">
          <FixtureBFC
            teamBFC={this.props.teamBFC}
            beyondScore={this.props.beyondScore}
            scoreChange={this.addGoalBFC.bind(this)}
          />
          </div>
          <div className="vs-fixture"> : </div>
          <div className="fixture-teams">
          <FixtureOPP
            teamOPP={this.props.teamOPP}
            oppScore={this.props.oppScore}
            scoreChange={this.addGoalOPP.bind(this)}
          />
          </div>
        </div>
    );
  }
}
