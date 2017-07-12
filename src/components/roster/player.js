import React, { Component } from 'react';


class Player extends Component {
  render(){
    return (
      <div>
        <div className="large"><input className="p-5" type="checkbox" /> <button className="btn btn-primary">Frank </button> </div>
        <div>Player Name</div>
        <div>Minutes Played</div>
      </div>
    );
  }
}

export default Player;
