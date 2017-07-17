import React, { Component } from 'react';


class Player extends Component {

  togglePlayer(index) {
    this.props.togglePlayer(index);
  }

  render(){
    // console.log(this.props.roster[this.props.index].playerActive, this.props.roster[this.props.index].playerActive)
    return (
      <div
        className="roster"
        onClick={this.togglePlayer.bind(this, this.props.index)}
        >

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
