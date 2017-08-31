import React, { Component } from 'react';
// import { PlayerStats } from '../data/player-stats';

export default class GameReportAssists extends Component {
  render() {

    const roster = this.props.roster;
    // const roster = PlayerStats;
    const assists = roster
      .filter((player, id) => player.assists.length > 0)
      .map((player, id) =>
        `${player.firstName} ${player.lastName} ${player.twitter()} `);

    console.log("Assists by: ", assists);


    return (
      <div>
        <div className="report-titles">
          Assists
        </div>
        <div className="report-summary">
          { assists.length > 0
            ? `Assists by ${assists}`
            : null
          }
        </div>
      </div>
    );
  };
}
