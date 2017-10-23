import React, { Component } from 'react';
// import { PlayerStats } from '../data/player-stats';

export default class GameReportScorers extends Component {

  render() {

    const roster = this.props.roster;
    // const roster = PlayerStats;
    const scorers = roster
      .filter((player, id) => player.goals.length > 0)
      .map((player, id) =>
            // `${player.firstName} ${player.lastName} ${player.twitter()} (${player.goals.map((goal, id) => goal + "'")})`);
            `${player.firstName} ${player.lastName} (${player.goals.map((goal, id) => (Math.ceil(goal / 60) + "'"))})`);

    const scorerHandles = roster
      .filter((player, id) => player.goals.length > 0)
      .map((player, id) =>
            `${player.twitter()}`);

    console.log("Our scorers today: ", scorers);

    return (
      <div>
        <div className="report-titles">
          Scorers
        </div>
        <div className="report-summary">
        {scorers.length > 1
          ? `${scorerHandles} score for ${this.props.teamBFC}: `
          : scorers.length > 0
            ? `${scorerHandles} scores for ${this.props.teamBFC}: `
            : null
        }
        {scorers}
      </div>
      </div>
    );
  };
}
