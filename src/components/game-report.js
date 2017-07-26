import React, { Component } from 'react';
import { GameReportsTemplate } from '../data/game-reports';




export default class GameReport extends Component {

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
    console.log(sentimentKey, GameReportsTemplate[0].win[sentimentKey]);


    const reportVersions = sentimentFilter[sentimentKey].length
    const report = sentimentFilter[sentimentKey][Math.floor(Math.random() * reportVersions)]


    return (
      <div className="container">
          <div className="row">
              <div className="col-md-4 "></div>
              <div className="col-sm-4 bfc-live">
                <h2 className="setting-h">Game Report</h2>
                <div className="flex-vh flex-con flex-dir-col">
                  <div className="report-titles">
                    Summary
                  </div>
                  <div className="report-summary">
                  {report}
                  </div>
                  <div className="report-titles">
                    Scorers
                  </div>
                  <div className="report-titles">
                    Assists
                  </div>
                  <div className="copy-report">Copy game report to clip board</div>
                </div>  
              </div>
          </div>
      </div>
    );
  }
}
