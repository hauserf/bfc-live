import React, { Component } from 'react';

import StartInput from './start-input';
import { AppLang } from '../data/applang';


export default class Start extends Component {

  setTeamCode(e) {
    this.props.setTeamCode(e)
  }

  render() {

    const applang = this.props.applang;
    const copy = AppLang.views.start;

    return (
      <div>
        <h3 className="title-start text-center">{copy.teamCode[applang]}</h3>
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
