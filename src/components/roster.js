import React, { Component } from 'react';
import Player from './player'
import { PlayerStats } from '../data/player-stats';


export default class Roster extends Component {
  constructor(){
    super();
    this.state = {
      startingXI: [],
      roster: [],
    }
  }

  movePlayer(){
    const startingEleven = this.state.startingXI;
    //   // move player from array "roster" to array "startingXI"
    //   // step two: be able to move the players back and forth by simply clicking on the player div
    //   // if player is in array roster > onClick moves him to array "startingXI" and the other way around
    this.setState({startingXI: startingEleven });
  }


  render(){

    const roster = PlayerStats.map((player, id)  => <Player name={player.firstName} key={id} switchArrays={this.movePlayer.bind(this)}/>)

    return(
      <div className="container">
        <div className="row">
          <div className="col-md-4 "></div>
          <div className="col-sm-4 bfc-live">
            <div>
              Starting XI
              ...coming soon
              {this.state.startingXI}

              Roster
              {roster}
            </div>
          </div>
        </div>
      </div>
    )
  }

}
