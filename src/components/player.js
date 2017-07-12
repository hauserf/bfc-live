import React, { Component } from 'react';


class Player extends Component {

  movePlayer(e) {
    this.props.switchArrays();
  }

  render(){
    return (
      <div className="roster" onClick={this.movePlayer.bind(this)}>
        <div className="player">
          {this.props.name}
        </div>
        <div className="player-minutes">
          00:00
        </div>
      </div>
    );
  }
}

export default Player;
