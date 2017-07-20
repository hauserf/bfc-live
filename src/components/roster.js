import React, { Component } from 'react';
import Player from './player'
import { PlayerStats } from '../data/player-stats';


export default class Roster extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      // playersOnField: [],
      playersPlaying: [{firstName: "Dirk"}],
      roster: PlayerStats,
    }
  }

  togglePlayer(id) {
    console.log(id);
    const playersPlaying = this.state.playersPlaying;
    const playerStats = PlayerStats[id]
    // this.PlayerStats[id].id === playersPlaying[id].id
    // this.subPlayerOut(id)  
    PlayerStats.some((id) => { return PlayerStats[id].id === playersPlaying[id].id })
    ? this.subPlayerOut(id)
    : this.subPlayerIn(id)
  }




  // subPlayerIn(id){
  //   const roster = this.state.roster;
  //   roster[id].playerActive = true;
  //   const playerToMove = this.state.roster.splice(id, 1);
  //   this.setState({ roster });
  //
  //   const playersPlaying = this.state.playersPlaying;
  //   const playersOnField = playersPlaying.concat(playerToMove);
  //   this.setState({ playersPlaying: playersOnField });
  // }

  subPlayerIn(id) {
    const roster = this.state.roster;
    roster[id].playerActive = true;
    const rosterUpdated = [
      ...roster.slice(0, id),
      ...roster.slice(id + 1)
    ];

    const playersPlaying = this.state.playersPlaying;
    const playersPlayingUpdated = [
      ...playersPlaying,
      roster[id]
    ]

    this.setState({ roster: rosterUpdated });
    this.setState({ playersPlaying: playersPlayingUpdated });
  }

  // subPlayerOut(id) {
  //   const playersPlaying = this.state.playersPlaying;
  //   const playerToMove = playersPlaying.splice(id, 1);
  //   this.setState({ playersPlaying });
  //
  //   const roster = this.state.roster;
  //   roster[id].playerActive = false;
  //   const rosterList = roster.concat(playerToMove);
  //   this.setState({ roster: rosterList });
  //   }

    subPlayerOut(id) {
      const playersPlaying = this.state.playersPlaying;
      const playersPlayingUpdated = [
      ...playersPlaying.slice(0, id),
      ...playersPlaying.slice(id+1)
      ];

      const roster = this.state.roster;
      const rosterUpdated = [
        ...roster,
        playersPlaying[id]
      ]
      this.setState({ playersPlaying: playersPlayingUpdated })
      this.setState({ roster: rosterUpdated });
    }



  render(){
    // map/list players from data/player.stats.js in "Subs"
    const roster = this.state.roster
    const rosterList = roster.map((player, id)  =>
        <Player
          name={player.firstName}
          key={id}
          index={id}
          togglePlayer={this.togglePlayer.bind(this)}
        />)

      // map/list players in "On the field" (as in currently playing)
      const playersPlaying = this.state.playersPlaying;
      const playersPlayingList = playersPlaying.map((player, id)  =>
          <Player
            name={player.firstName}
            key={id}
            index={id}
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
              {playersPlayingList}
              <h1>Subs</h1>
              {rosterList}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

/* togglePlayer(id){
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
} */
