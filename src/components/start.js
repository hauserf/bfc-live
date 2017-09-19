import React, { Component } from 'react';

import StartInput from './start-input';


export default class Start extends Component {

  setTeamCode(e) {
    this.props.setTeamCode(e)
  }

  render() {
    return (
      <div>
        <h3 className="title-start text-center">Enter Team Code</h3>
        <StartInput
          setTeamCode={this.setTeamCode.bind(this)}
          teamCode={this.props.teamCode}
          teams={this.props.teams}
          teamCodeMatched={this.props.teamCodeMatched}
        />
      </div>
    )
  }
}
