import React, { Component } from 'react';
import Schedule from './schedule';

export default class Games extends Component {

    setTeamCode(e) {
      this.props.setTeamCode(e)
    }

    render() {
      return (
        <div>
          <div className="flex-vh flex-con flex-dir-col">
            {/* <h2 className="setting-h">Schedule</h2> */}
            <Schedule
              setTeamCode={this.setTeamCode.bind(this)}
            />
          </div>
        </div>
      )
    }
}
