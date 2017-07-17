import React, { Component } from 'react';
import Player from './player'
import { PlayerStats } from '../data/player-stats';


export default class Roster extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      playersPlaying: [],
      playersNotPlaying:[],
      roster: PlayerStats
    }
  }

  togglePlayer(id){
    const roster = this.state.roster;
    const playerToMove = this.state.roster.splice(id, 1);
    const playersOnField = playersPlaying.concat(playerToMove);
    console.log(playerToMove);
    const playersPlaying = this.state.playersPlaying;
    const playersNotPlaying= this.state.playersNotPlaying;

    if(playersOnField[0].playerActive){
      playersPlaying.concat(playerToMove);
    } else{
      const playersNotOnField = playersNotPlaying.concat(playerToMove);
    }
  }

  subPlayerIn(id){
    // onClick event = click on player in "Subs" >> move him into array "playersPlaying" ("On the field")

    const roster = this.state.roster;
    const playerToMove = this.state.roster.splice(id, 1);
    console.log(playerToMove);

    const playersPlaying = this.state.playersPlaying;
    const playersOnField = playersPlaying.concat(playerToMove);

    this.setState({ roster });

    this.setState({ playersPlaying: playersOnField });
    //playersOnField[playersOnField.length - 1].playerActive = true;

    console.log(
      playersOnField, "playersOnField",
      playersOnField.length, "playersOnField.length",
      playersOnField[0].playerActive, "playersOnField",
      this.state.playersPlaying, "player [playing]",
      this.state.roster[id].id, "roster id"
    );
  }

  subPlayerOut(id) {
    const playersPlaying = this.state.playersPlaying;
    const playerToMove = playersPlaying.splice(id, 1);
    this.setState({ playersPlaying });
    const roster = this.state.roster;
    const rosterList = roster.concat(playerToMove);
    this.setState({ roster: rosterList });
    rosterList[rosterList.length - 1].playerActive = false;
    }



  render(){
    // map/list players from data/player.stats.js in "Subs"
    const rosterList = PlayerStats.map((player, id)  =>
        <Player
          name={player.firstName}
          key={id}
          index={id}
          subPlayerIn={this.subPlayerIn.bind(this)}
          roster={this.state.roster}
        />)

      // map/list players in "On the field" (as in currently playing)
      const playersPlaying = this.state.playersPlaying;
      const playersOnField = playersPlaying.map((player, id)  =>
        <div key={id}>
          <Player
            name={player.firstName}
            key={id}
            index={id}
            subPlayerOut={this.subPlayerOut.bind(this)}
            roster={this.state.roster}
            playerXYZIsPlaying={this.state.playersPlaying[id].id}
            currentActive={player.playerActive}
          />
        </div>)

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
