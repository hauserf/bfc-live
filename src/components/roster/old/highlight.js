import React from 'react';

const Highlight = (props) => {

  return (
    <div className="highlight">
      <div className="timestamp"> 12' </div>
      <div className="event"> {props.gameEvents[0]}</div>
    </div>
  )

}

export default Highlight;
