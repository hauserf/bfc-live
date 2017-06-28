import React from 'react';

const Highlight = () => {

  return (
    <div className="highlight">
      <div className="timestamp"> 12' </div>
      <div className="event"> Goal {new Date().getSeconds()} </div>
    </div>
  )

}

export default Highlight;
