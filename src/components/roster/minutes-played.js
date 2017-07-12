import React, { Component } from 'react';
import Roster from './roster';
import Player from './player';




class MinutesPlayed extends Component {
  render() {
    console.log(Roster[1].playerName)
    return (
      <div>
        <Player />
      </div>
    );
  }
}

export default MinutesPlayed;
