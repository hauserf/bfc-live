import React, { Component } from 'react';
import { GameReportsTemplate } from '../data/game-reports';


const apiURL = 'http://localhost:3001/api/v1/teams';

export default class GameReport extends Component {

  // componentWillMount() {
  //   var Jimp = require ('jimp');
  //   var numberString = "1:1";
  //
  //   Jimp.read("../public/BFC_CSL_Jerseys.png", function (err, img) {
  //       if (err) throw err;
  //       Jimp.loadFont( Jimp.FONT_SANS_64_WHITE ).then(function (font) { // load font from .fnt file
  //       img.print(font, 50, 50, numberString)
  //       img.print(font, 50, 110, "59'")
  //       img.print(font, 50, 170, "Jesse Rose")
  //       img.scaleToFit( 400, 400)
  //             .write("../public/BFC_CSL_Jerseys_new.jpg"); // save
  //       // image.print(font, x, y, str, width); // print a message on an image with text wrapped at width
  //   });
  //   });
  // }

  constructor(props){
    super(props);
    this.state = {
      playerStats: {}
    }
  }

  componentWillMount(){
    fetch(apiURL)
    .then(data => data.json())
    .then(data => {
      this.setState({
      playerStats: data.players
      })
    });
  }

  render() {
    console.log("Player Stats", this.state.playerStats[1], this.state.playerStats[0]);

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
          <div>
            Response from API call
            Loading...

          </div>
          {/* <img src="BFC_CSL_Jerseys_new.jpg" alt="report_img" /> */}
          <div className="copy-report">Copy game report to clip board</div>
        </div>
      </div>
    );
  }
}
