import React, { Component } from 'react';
import Formation from './formation';
import Length from './length';
import SettingOpponent from './setting-opponent';
import SettingBFCTeam from './setting-bfc-team';

export default class Settings extends Component {

    setBFCTeam(e) {
        this.props.setBFCTeam(e);
    }

    setOPPTeam(e) {
        this.props.setOPPTeam(e);
    }

    handleFormationSelected = (formationName) => {
      this.props.handleFormationSelected(formationName);
    }

    handleLengthOfHalfSelected = (lengthAdjuster) => {
      this.props.handleLengthOfHalfSelected(lengthAdjuster);
    }

    render() {
      return (
        <div>
          <div className="flex-vh flex-con flex-dir-col flex-items-align">
            <h2 className="setting-h">Settings</h2>
            <SettingBFCTeam
              data={this.props.data}
              setBFCTeam={this.setBFCTeam.bind(this)}
            />
            <SettingOpponent
              teamOPP={this.props.teamOPP}
              setOPPTeam={this.setOPPTeam.bind(this)}
            />
            <Formation
              handleFormationSelected={this.handleFormationSelected}
              format={this.props.format}
            />
            <Length
              handleLengthOfHalfSelected={this.handleLengthOfHalfSelected}
              lengthOfHalf={this.props.lengthOfHalf}
            />
          </div>
        </div>
      )
    }
}
