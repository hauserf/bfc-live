import React, { Component } from 'react';
import { GameReportsTemplate } from '../data/game-reports';

export default class GameReportSummary extends Component {
  render() {

    const outcomeFilter = () => {
      if (this.props.beyondScore > this.props.oppScore) {
        return "win"
      } else if (this.props.beyondScore === this.props.oppScore) {
          return "tie"
        } else if (this.props.beyondScore < this.props.oppScore) {
            return "defeat"
          } else return null
    }

    const outcomeFilterIndex = () => {
      if (this.props.beyondScore > this.props.oppScore) {
        return 0
      } else if (this.props.beyondScore === this.props.oppScore) {
          return 1
        } else if (this.props.beyondScore < this.props.oppScore) {
            return 2
          } else return "Game report cannot be processed"
    }

    const templates = GameReportsTemplate;
    const sentimentFilter = templates[outcomeFilterIndex()][outcomeFilter()]


    var sentimentKey = this.props.sentiment;
    // console.log(sentimentKey, GameReportsTemplate[0].win[sentimentKey]);


    const reportVersions = sentimentFilter[sentimentKey].length
    const report = sentimentFilter[sentimentKey][Math.floor(Math.random() * reportVersions)]


    return (
      <div>
        <div className="report-titles">
          Summary
        </div>
        <div className="report-summary">
        {report}
        </div>
      </div>
    );
  };
}
