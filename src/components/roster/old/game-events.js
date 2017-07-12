import React from 'react';


const GameEvents = (props) => {

  return (
    <div className="highlight">
      <div className="timestamp"> 12' </div>
      <div className="event"> {props.gameEvents[1]}</div>
    </div>
  )

}

export default GameEvents;
