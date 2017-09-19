import React, { Component } from 'react'
import FixtureBFCFanview from './fixture-bfc-fv';
import FixtureOPPFanview from './fixture-opp-fv';


export default class FixtureFanview extends Component {

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
          <FixtureBFCFanview
            teamBFC={this.props.teamBFC}
            beyondScore={this.props.beyondScore}
            scoreChange={this.addGoalBFC.bind(this)}
          />
          </div>
          <div className="vs-fixture"> : </div>
          <div className="fixture-teams">
          <FixtureOPPFanview
            teamOPP={this.props.teamOPP}
            oppScore={this.props.oppScore}
            scoreChange={this.addGoalOPP.bind(this)}
          />
          </div>
        </div>
    );
  }
}
