import React, { Component } from 'react';

export default class PlayerName extends Component {
  render() {
    const handleToggle = this.props.handleToggle.bind(null, this.props.id);

    return (
      <div className="player-names" onClick={handleToggle}>
          {this.props.player.firstName}
      </div>
    );
  }
}
