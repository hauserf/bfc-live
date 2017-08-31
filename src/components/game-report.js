import React, { Component } from 'react';
import GameReportSummary from './game-report-summary';
import GameReportScorers from './game-report-scorers';
import GameReportAssists from './game-report-assists';
import GameReportJimp from './game-report-jimp';

export default class GameReport extends Component {

  render() {
    return (
      <div>
        <h2 className="setting-h">Game Report</h2>
        <div className="flex-vh flex-con flex-dir-col">
          <GameReportSummary
            beyondScore={this.props.beyondScore}
            oppScore={this.props.oppScore}
            sentiment={this.props.sentiment}
          />
          <GameReportScorers
            roster={this.props.roster}
            teamBFC={this.props.teamBFC}
            teamOPP={this.props.teamOPP}
          />
          <GameReportAssists
            roster={this.props.roster}
            teamBFC={this.props.teamBFC}
            teamOPP={this.props.teamOPP}
          />
          <GameReportJimp />
          <div className="copy-report">Copy game report to clip board</div>
        </div>
      </div>
    );
  }
}
