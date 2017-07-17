import React, { Component } from 'react';
import Player from './player'
import { PlayerStats } from '../data/player-stats';


export default class Roster extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      playersOnField: [],
      playersPlaying: [],
      roster: PlayerStats,
    }
  }

  togglePlayer(id) {

    this.state.roster[id].playerActive === true
    ? this.subPlayerOut(id)
    : this.subPlayerIn(id)
  }


  subPlayerIn(id){
    const roster = this.state.roster;
    roster[id].playerActive = true;
    const playerToMove = this.state.roster.splice(id, 1);
    this.setState({ roster });

    const playersPlaying = this.state.playersPlaying;
    const playersOnField = playersPlaying.concat(playerToMove);
    this.setState({ playersPlaying: playersOnField });


  }

  subPlayerOut(id) {
    const playersPlaying = this.state.playersPlaying;
    const playerToMove = playersPlaying.splice(id, 1);
    this.setState({ playersPlaying });

    const roster = this.state.roster;
    roster[id].playerActive = false;
    const rosterList = roster.concat(playerToMove);
    this.setState({ roster: rosterList });

    }




  render(){
    // map/list players from data/player.stats.js in "Subs"
    const rosterList = PlayerStats.map((player, id)  =>
        <Player
          name={player.firstName}
          key={id}
          index={id}
          togglePlayer={this.togglePlayer.bind(this)}
        />)

      // map/list players in "On the field" (as in currently playing)
      const playersPlaying = this.state.playersPlaying;
      const playersOnField = playersPlaying.map((player, id)  =>
          <Player
            name={player.firstName}
            key={id}
            ident={id}
            togglePlayer={this.togglePlayer.bind(this)}
          />
        )

    return(
      <div className="container">
        <div className="row">
          <div className="col-md-4 "></div>
          <div className="col-sm-4 bfc-live">
            <div>
              <h1>On the field</h1>
              {playersOnField}
              <h1>Subs</h1>
              {rosterList}
            </div>
          </div>
        </div>
      </div>
    )
  }

}
